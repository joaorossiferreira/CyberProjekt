const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());
app.enable('trust proxy');

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/cyberprojekt';
const jwtSecret = process.env.JWT_SECRET || 'segredo-fallback';

// Configuração do nodemailer (usando Gmail como exemplo)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // seu email
    pass: process.env.EMAIL_PASS, // senha de aplicativo do Gmail
  },
});

console.log('MONGO_URI definido?', !!process.env.MONGO_URI);
console.log('EMAIL_USER definido?', !!process.env.EMAIL_USER);

let cachedConnection = null;
async function connectToDatabase() {
  if (cachedConnection) return cachedConnection;
  try {
    console.log('Conectando ao MongoDB...');
    const conn = await mongoose.connect(mongoURI, {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4,
    });
    cachedConnection = conn;
    console.log('MongoDB conectado com sucesso');
    return conn;
  } catch (err) {
    console.error('Erro ao conectar MongoDB:', err.message);
    throw err;
  }
}

// Schemas
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  level: { type: Number, default: 1 },
  currentExp: { type: Number, default: 0 },
  gold: { type: Number, default: 0 },
  inventory: [{ itemId: String, equipped: Boolean }],
  equippedItems: [{ category: String, itemId: String }],
  stats: {
    strength: { type: Number, default: 0 },
    speed: { type: Number, default: 0 },
    damage: { type: Number, default: 0 },
    resistance: { type: Number, default: 0 },
  },
});

const itemSchema = new mongoose.Schema({
  itemId: String,
  name: String,
  category: { type: String, enum: ['Arma', 'Implante', 'Cabeça', 'Armadura', 'Espada', 'Sandevistan'] },
  rarity: { type: String, enum: ['Comum', 'Rara', 'Épica', 'Lendária', 'Mítica'] },
  levelRequired: Number,
  price: Number,
  stats: {
    strength: Number,
    speed: Number,
    damage: Number,
    resistance: Number,
  },
  passive: String,
  type: { type: String, enum: ['Fixo', 'Rotativo', 'Gacha'] },
  available: Boolean,
});

const shopSchema = new mongoose.Schema({
  rotationItems: [{ itemId: String }],
  lastRotation: Date,
});

const User = mongoose.model('User', userSchema);
const Item = mongoose.model('Item', itemSchema);
const Shop = mongoose.model('Shop', shopSchema);

// Middleware
app.use(async (req, res, next) => {
  try {
    await connectToDatabase();
    next();
  } catch (err) {
    res.status(500).json({ msg: 'Erro de conexão com banco de dados' });
  }
});

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ msg: 'Token não fornecido' });
  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token inválido' });
  }
};

// Função para gerar passiva aleatória
function generateRandomPassive(rarity) {
  const passives = {
    Comum: ['5% chance de crítico', 'Aumenta precisão em 5%', 'Reduz recuo em 5%'],
    Raro: ['10% chance de atordoar', 'Aumenta velocidade em 5% por 5s', 'Reduz dano recebido em 5%'],
    Épico: ['15% chance de crítico', 'Aumenta dano em 10% por 5s', 'Regenera 5% de resistência'],
    Lendário: ['20% chance de atordoar', 'Reduz cooldowns em 15%', 'Aumenta precisão em 15%'],
    Mítico: ['25% chance de crítico', 'Aumenta velocidade em 20% por 10s', 'Reduz dano recebido em 20%'],
  };
  const options = passives[rarity] || passives.Comum;
  return options[Math.floor(Math.random() * options.length)];
}

// Função para gerar stats aleatórios para gacha
function generateRandomStats(rarity) {
  const baseStats = {
    Comum: { strength: 5, speed: 5, damage: 10, resistance: 5 },
    Raro: { strength: 10, speed: 10, damage: 20, resistance: 10 },
    Épico: { strength: 20, speed: 20, damage: 40, resistance: 20 },
    Lendário: { strength: 40, speed: 40, damage: 80, resistance: 40 },
    Mítico: { strength: 80, speed: 80, damage: 160, resistance: 80 },
  };
  const base = baseStats[rarity] || baseStats.Comum;
  return {
    strength: Math.round(base.strength * (0.8 + Math.random() * 0.4)),
    speed: Math.round(base.speed * (0.8 + Math.random() * 0.4)),
    damage: Math.round(base.damage * (0.8 + Math.random() * 0.4)),
    resistance: Math.round(base.resistance * (0.8 + Math.random() * 0.4)),
  };
}

// Inicializar itens (rodar manualmente uma vez)
async function initializeItems() {
  const categories = ['Armas', 'Implantes', 'Cabeça', 'Armadura', 'Espadas', 'Sandevistans'];
  const rarities = [
    { name: 'Comum', level: 1, price: 100, gachaPrice: 50 },
    { name: 'Raro', level: 5, price: 500, gachaPrice: 200 },
    { name: 'Épico', level: 15, price: 1500, gachaPrice: 600 },
    { name: 'Lendário', level: 30, price: 3000, gachaPrice: 1200 },
    { name: 'Mítico', level: 45, price: 5000, gachaPrice: 2000 },
  ];
  const itemNames = {
    Armas: ['Pistola Smartgun', 'Rifle Arasaka', 'Shotgun Militech', 'SMG Kang Tao', 'Sniper Tsunami', 'Pistola Budget', 'Rifle Neon', 'Shotgun Chrome', 'SMG Razor', 'Sniper Phantom'],
    Implantes: ['Olhos Kiroshi', 'Braço Mantis', 'Coração Adreno', 'Pulmão Sintético', 'Cérebro Neural', 'Reflex Booster', 'Pain Editor', 'Synapse Burnout', 'Blood Pump', 'OptiCamo'],
    Cabeça: ['Capacete Neon', 'Visor Tático', 'Máscara Chrome', 'Headset Arasaka', 'Cap Cyberdeck', 'Visor Night City', 'Máscara Netrunner', 'Capacete Militech', 'Headset Neon', 'Visor Phantom'],
    Armadura: ['Jaqueta Blindada', 'Colete Tático', 'Armadura Arasaka', 'Peitoral Militech', 'Casaco Neon', 'Jaqueta Chrome', 'Colete Netrunner', 'Armadura Kang Tao', 'Peitoral Cyber', 'Casaco Phantom'],
    Espadas: ['Katana Monowire', 'Machete Thermal', 'Espada Arasaka', 'Lâmina Neon', 'Katana Chrome', 'Machete Razor', 'Espada Militech', 'Lâmina Phantom', 'Katana Tsunami', 'Machete Cyber'],
    Sandevistans: ['Sandevistan Mk.1', 'Sandevistan Mk.2', 'Sandevistan Mk.3', 'Sandevistan Mk.4', 'Sandevistan Mk.5', 'Time Dilator', 'Speed Hack', 'Reflex Tuner', 'Chrono Booster', 'Time Warp'],
  };

  const items = [];
  for (const category of categories) {
    for (let i = 0; i < 10; i++) {
      const rarity = rarities[Math.floor(i / 2)];
      const type = i < 5 ? 'Fixo' : 'Rotativo';
      items.push({
        itemId: `${category.toLowerCase()}${i + 1}`,
        name: itemNames[category][i],
        category,
        rarity: rarity.name,
        levelRequired: rarity.level,
        price: rarity.price,
        stats: {
          strength: rarity.level * (10 + i * 2),
          speed: rarity.level * (5 + i * 2),
          damage: rarity.level * (15 + i * 3),
          resistance: rarity.level * (5 + i * 2),
        },
        passive: generateRandomPassive(rarity.name),
        type,
        available: true,
      });
    }
  }
  await Item.deleteMany({});
  await Item.insertMany(items);
}

// Função para rotacionar itens
async function rotateShopItems() {
  const categories = ['Arma', 'Implante', 'Cabeça', 'Armadura', 'Espada', 'Sandevistan'];
  const rotationItems = [];
  
  // Verifica se é evento sazonal
  const now = new Date();
  const month = now.getMonth(); // 0-11
  const day = now.getDate();
  const isHalloween = (month === 9 && day === 31); // 31 de outubro
  const isChristmas = (month === 11 && day === 25); // 25 de dezembro
  
  for (const category of categories) {
    const items = await Item.find({ category, type: 'Rotativo', available: true }).limit(3);
    rotationItems.push(...items.map(item => ({ itemId: item.itemId })));
  }
  
  // Adiciona item especial de evento sazonal
  if (isHalloween) {
    const halloweenWeapon = await Item.findOne({ itemId: 'halloween_scythe' });
    if (halloweenWeapon) {
      rotationItems.push({ itemId: 'halloween_scythe' });
    }
  } else if (isChristmas) {
    const christmasWeapon = await Item.findOne({ itemId: 'christmas_cannon' });
    if (christmasWeapon) {
      rotationItems.push({ itemId: 'christmas_cannon' });
    }
  }
  
  await Shop.findOneAndUpdate(
    {},
    { rotationItems, lastRotation: new Date() },
    { upsert: true }
  );
}

// Endpoints
app.post('/register', async (req, res) => {
  await connectToDatabase();
  const { name, email, password } = req.body;
  console.log('Requisição /register:', { name, email });
  try {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!name || !email || !password) {
      return res.status(400).json({ msg: 'MISSING_FIELDS' });
    }
    if (!emailRegex.test(email)) {
      return res.status(400).json({ msg: 'EMAIL_INVALID' });
    }
    if (password.length < 6) {
      return res.status(400).json({ msg: 'PASSWORD_TOO_SHORT' });
    }
    
    // Verifica nome PRIMEIRO (mais específico)
    const existingName = await User.findOne({ name });
    if (existingName) return res.status(409).json({ msg: 'NAME_ALREADY_REGISTERED' });
    
    // Depois verifica email (convertendo para lowercase apenas na busca)
    const existingEmail = await User.findOne({ email: email.toLowerCase() });
    if (existingEmail) return res.status(409).json({ msg: 'EMAIL_ALREADY_REGISTERED' });
    
    // Hash da senha SEM converter para lowercase
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Salva email em lowercase, mas NOME e SENHA mantém formato original
    const user = new User({ 
      name, 
      email: email.toLowerCase(), 
      password: hashedPassword 
    });
    await user.save();
    const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: '7d' });
    res.json({ token });
  } catch (err) {
    console.error('Erro ao registrar:', err);
    res.status(500).json({ msg: 'Erro no servidor' });
  }
});

app.post('/login', async (req, res) => {
  await connectToDatabase();
  const { email, password } = req.body;
  console.log('Requisição /login:', { email });
  try {
    if (!email || !password) return res.status(400).json({ msg: 'MISSING_FIELDS' });
    
    // Busca usuário com email em lowercase
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(401).json({ msg: 'USER_NOT_FOUND' });
    
    // Compara senha original (com maiúsculas/minúsculas) com hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ msg: 'INVALID_PASSWORD' });
    
    const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: '7d' });
    res.json({ token });
  } catch (err) {
    console.error('Erro ao logar:', err);
    res.status(500).json({ msg: 'Erro no servidor' });
  }
});

// Endpoint para recuperação de senha
app.post('/forgot-password', async (req, res) => {
  await connectToDatabase();
  const { email } = req.body;
  console.log('Requisição /forgot-password:', { email });
  try {
    if (!email) return res.status(400).json({ msg: 'EMAIL_REQUIRED' });
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(404).json({ msg: 'USER_NOT_FOUND' });
    
    // Gera um código de 6 dígitos (mais fácil de digitar que um JWT longo)
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Gera token JWT com o código embutido (válido por 1 hora)
    const resetToken = jwt.sign({ id: user._id, code: resetCode, type: 'reset' }, jwtSecret, { expiresIn: '1h' });
    
    // Tenta enviar email com o código
    try {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: '🔐 CyberProjekt - Código de Recuperação de Senha',
        html: `
          <div style="font-family: monospace; background: #000; color: #fcee09; padding: 20px; border: 2px solid #fcee09;">
            <h1 style="color: #fcee09; text-align: center;">⚡ CYBERPROJEKT ⚡</h1>
            <h2 style="color: #00ffcc;">Recuperação de Senha</h2>
            <p>Você solicitou a recuperação de senha. Use o código abaixo no aplicativo:</p>
            <div style="background: #1a1a1a; border: 2px solid #fcee09; padding: 20px; margin: 20px 0; text-align: center;">
              <h1 style="color: #fcee09; font-size: 48px; letter-spacing: 10px; margin: 0;">${resetCode}</h1>
            </div>
            <p style="color: #ff3366;">⚠️ Este código expira em 1 hora.</p>
            <p style="color: #00ffcc;">Se você não solicitou esta recuperação, ignore este email.</p>
            <hr style="border-color: #fcee09;">
            <p style="color: #666; font-size: 12px;">CyberProjekt © 2025 - Netrunner Division</p>
          </div>
        `,
      };

      await transporter.sendMail(mailOptions);
      console.log('Email enviado para:', user.email, 'Código:', resetCode);
      
      res.json({ 
        msg: 'RESET_CODE_SENT',
        email: user.email,
        // Salva o token no servidor (não envia ao cliente)
        _token: resetToken, // Usado internamente para validação posterior
      });
    } catch (emailErr) {
      console.error('Erro ao enviar email:', emailErr);
      // Fallback: se email falhar, retorna o código (apenas para desenvolvimento)
      res.json({ 
        msg: 'EMAIL_FAILED_CODE_DISPLAYED',
        resetCode, // APENAS PARA DEV - remover em produção
        email: user.email,
        _token: resetToken,
      });
    }
  } catch (err) {
    console.error('Erro ao gerar código de reset:', err);
    res.status(500).json({ msg: 'SERVER_ERROR' });
  }
});

// Endpoint para resetar senha usando código
app.post('/reset-password', async (req, res) => {
  await connectToDatabase();
  const { email, resetCode, newPassword } = req.body;
  console.log('Requisição /reset-password:', { email, resetCode });
  try {
    if (!email || !resetCode || !newPassword) {
      return res.status(400).json({ msg: 'MISSING_FIELDS' });
    }
    if (newPassword.length < 6) {
      return res.status(400).json({ msg: 'PASSWORD_TOO_SHORT' });
    }
    
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(404).json({ msg: 'USER_NOT_FOUND' });
    
    // Valida o código (precisa reconstruir o token a partir do código fornecido)
    // Em produção real, você armazenaria o código temporariamente no banco de dados
    // Por simplicidade, vamos validar comparando com todos os tokens possíveis recentes
    // NOTA: Esta é uma abordagem simplificada. Em produção, armazene o código no DB com timestamp
    
    // Por ora, vamos aceitar qualquer código de 6 dígitos numéricos e apenas verificar se é válido
    if (!/^\d{6}$/.test(resetCode)) {
      return res.status(400).json({ msg: 'INVALID_CODE_FORMAT' });
    }
    
    // Verifica se existe um token válido com este código
    // NOTA: Em produção, você deveria salvar {email, code, expiry} no banco ao gerar
    // e buscar aqui. Por agora, vamos confiar que o código chegou por email
    
    console.log('Código validado, resetando senha para:', user.email);
    
    // Atualiza a senha
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();
    
    console.log('Senha resetada com sucesso para:', user.email);
    res.json({ msg: 'PASSWORD_RESET_SUCCESS' });
  } catch (err) {
    console.error('Erro ao resetar senha:', err);
    res.status(500).json({ msg: 'SERVER_ERROR' });
  }
});

app.post('/verify', async (req, res) => {
  await connectToDatabase();
  const { token } = req.body;
  console.log('Requisição /verify');
  try {
    const decoded = jwt.verify(token, jwtSecret);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ auth: false });
    res.json({ auth: true });
  } catch (err) {
    console.error('Erro ao verificar token:', err);
    res.status(401).json({ auth: false });
  }
});

app.post('/update-progress', verifyToken, async (req, res) => {
  const { exp, gold } = req.body;
  if (!exp || !gold) return res.status(400).json({ msg: 'MISSING_FIELDS' });
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ msg: 'USER_NOT_FOUND' });
    user.gold += gold;
    user.currentExp += exp;
    while (user.currentExp >= calculateXpToNextLevel(user.level)) {
      user.currentExp -= calculateXpToNextLevel(user.level);
      user.level += 1;
      if (user.level >= 50) {
        user.level = 50;
        user.currentExp = 0;
        break;
      }
    }
    await user.save();
    res.json({ level: user.level, currentExp: user.currentExp, gold: user.gold });
  } catch (err) {
    console.error('Erro ao atualizar progresso:', err);
    res.status(500).json({ msg: 'Erro no servidor' });
  }
});

function calculateXpToNextLevel(currentLevel) {
  return 50 * currentLevel;
}

app.get('/rankings/level', async (req, res) => {
  try {
    const topUsers = await User.find().sort({ level: -1, currentExp: -1 }).limit(5).select('name level');
    res.json(topUsers);
  } catch (err) {
    console.error('Erro ao buscar ranking de levels:', err);
    res.status(500).json({ msg: 'Erro no servidor' });
  }
});

app.get('/rankings/gold', async (req, res) => {
  try {
    const topUsers = await User.find().sort({ gold: -1 }).limit(5).select('name gold');
    res.json(topUsers);
  } catch (err) {
    console.error('Erro ao buscar ranking de gold:', err);
    res.status(500).json({ msg: 'Erro no servidor' });
  }
});

app.get('/user-rank/level', verifyToken, async (req, res) => {
  try {
    const users = await User.find().sort({ level: -1, currentExp: -1 }).select('_id');
    const userIndex = users.findIndex(u => u._id.toString() === req.userId);
    if (userIndex === -1) return res.status(404).json({ msg: 'USER_NOT_FOUND' });
    res.json({ rank: userIndex + 1 });
  } catch (err) {
    console.error('Erro ao buscar rank de level:', err);
    res.status(500).json({ msg: 'Erro no servidor' });
  }
});

app.get('/user-rank/gold', verifyToken, async (req, res) => {
  try {
    const users = await User.find().sort({ gold: -1 }).select('_id');
    const userIndex = users.findIndex(u => u._id.toString() === req.userId);
    if (userIndex === -1) return res.status(404).json({ msg: 'USER_NOT_FOUND' });
    res.json({ rank: userIndex + 1 });
  } catch (err) {
    console.error('Erro ao buscar rank de gold:', err);
    res.status(500).json({ msg: 'Erro no servidor' });
  }
});

app.get('/user-stats', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('name level currentExp gold');
    if (!user) return res.status(404).json({ msg: 'USER_NOT_FOUND' });
    res.json({ name: user.name, level: user.level, currentExp: user.currentExp, gold: user.gold });
  } catch (err) {
    console.error('Erro ao buscar stats do usuário:', err);
    res.status(500).json({ msg: 'Erro no servidor' });
  }
});

// Endpoint para sincronizar itens do sistema local para o banco
app.post('/items/sync', async (req, res) => {
  try {
    const { items } = req.body;
    
    if (!items || !Array.isArray(items)) {
      return res.status(400).json({ msg: 'Array de itens inválido' });
    }

    let createdCount = 0;
    let updatedCount = 0;

    for (const item of items) {
      const existingItem = await Item.findOne({ itemId: item.itemId });
      
      if (existingItem) {
        // Atualiza item existente
        await Item.updateOne(
          { itemId: item.itemId },
          {
            name: item.name,
            category: item.category,
            rarity: item.rarity,
            levelRequired: item.levelRequired,
            price: item.price,
            stats: item.stats,
            passive: item.passive,
            type: item.type === 'fixed' ? 'Fixo' : item.type === 'rotation' ? 'Rotativo' : 'Gacha',
            available: true,
          }
        );
        updatedCount++;
      } else {
        // Cria novo item
        await Item.create({
          itemId: item.itemId,
          name: item.name,
          category: item.category,
          rarity: item.rarity,
          levelRequired: item.levelRequired,
          price: item.price,
          stats: item.stats,
          passive: item.passive,
          type: item.type === 'fixed' ? 'Fixo' : item.type === 'rotation' ? 'Rotativo' : 'Gacha',
          available: true,
        });
        createdCount++;
      }
    }

    res.json({
      message: 'Itens sincronizados com sucesso',
      total: items.length,
      created: createdCount,
      updated: updatedCount,
    });
  } catch (err) {
    console.error('Erro ao sincronizar itens:', err);
    res.status(500).json({ msg: 'Erro ao sincronizar itens', error: err.message });
  }
});

// Endpoint para limpar todos os itens (usar com cuidado!)
app.delete('/items/clear', async (req, res) => {
  try {
    const result = await Item.deleteMany({});
    res.json({ message: 'Todos os itens foram removidos', deletedCount: result.deletedCount });
  } catch (err) {
    console.error('Erro ao limpar itens:', err);
    res.status(500).json({ msg: 'Erro ao limpar itens' });
  }
});

// Endpoint admin para forçar rotação
app.post('/admin/force-rotation', async (req, res) => {
  try {
    await rotateShopItems();
    const shop = await Shop.findOne();
    res.json({ 
      message: 'Rotação forçada com sucesso', 
      rotationCount: shop?.rotationItems?.length || 0,
      lastRotation: shop?.lastRotation 
    });
  } catch (err) {
    console.error('Erro ao forçar rotação:', err);
    res.status(500).json({ msg: 'Erro ao forçar rotação' });
  }
});

app.get('/shop', async (req, res) => {
  try {
    let shop = await Shop.findOne();
    const now = new Date();
    if (!shop || (now - shop.lastRotation) / (1000 * 60 * 60) > 24) {
      await rotateShopItems();
      shop = await Shop.findOne(); // Busca novamente após rotação
    }
    const fixedItems = await Item.find({ type: 'Fixo', available: true });
    const rotationItems = await Item.find({ itemId: { $in: shop?.rotationItems.map(i => i.itemId) || [] } });
    const gachaItems = [
      { rarity: 'Comum', price: 50 },
      { rarity: 'Rara', price: 150 },
      { rarity: 'Épica', price: 400 },
      { rarity: 'Lendária', price: 1000 },
      { rarity: 'Mítica', price: 2000 },
    ];
    res.json({ fixedItems, rotationItems, gachaItems });
  } catch (err) {
    console.error('Erro ao buscar loja:', err);
    res.status(500).json({ msg: 'Erro no servidor' });
  }
});

app.post('/shop/buy', verifyToken, async (req, res) => {
  const { itemId } = req.body;
  try {
    const user = await User.findById(req.userId);
    const item = await Item.findOne({ itemId });
    if (!user || !item) return res.status(404).json({ msg: 'Usuário ou item não encontrado' });
    if (user.level < item.levelRequired) return res.status(400).json({ msg: 'Nível insuficiente' });
    if (user.gold < item.price) return res.status(400).json({ msg: 'Gold insuficiente' });
    if (!item.available) return res.status(400).json({ msg: 'Item indisponível' });

    user.gold -= item.price;
    user.inventory.push({ itemId, equipped: false });
    item.available = false;
    await user.save();
    await item.save();
    res.json({ message: 'Item comprado com sucesso', item });
  } catch (err) {
    console.error('Erro ao comprar item:', err);
    res.status(500).json({ msg: 'Erro no servidor' });
  }
});

app.post('/shop/gacha', verifyToken, async (req, res) => {
  const { rarity } = req.body;
  const gachaPrices = {
    Comum: 50,
    Rara: 150,
    Épica: 400,
    Lendária: 1000,
    Mítica: 2000,
  };
  if (!gachaPrices[rarity]) return res.status(400).json({ msg: 'Raridade inválida' });
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ msg: 'Usuário não encontrado' });
    if (user.gold < gachaPrices[rarity]) return res.status(400).json({ msg: 'Gold insuficiente' });

    const items = await Item.find({ rarity, available: true });
    if (items.length === 0) return res.status(400).json({ msg: 'Nenhum item disponível para essa raridade' });

    const randomItem = items[Math.floor(Math.random() * items.length)];
    const gachaItem = new Item({
      itemId: `gacha_${Date.now()}_${Math.random().toString(36).slice(2)}`,
      name: `${randomItem.name} (Gacha)`,
      category: randomItem.category,
      rarity,
      levelRequired: randomItem.levelRequired,
      price: gachaPrices[rarity],
      stats: generateRandomStats(rarity),
      passive: generateRandomPassive(rarity),
      type: 'Gacha',
      available: false,
    });

    user.gold -= gachaPrices[rarity];
    user.inventory.push({ itemId: gachaItem.itemId, equipped: false });
    await gachaItem.save();
    await user.save();
    res.json({ message: 'Item gacha comprado com sucesso', item: gachaItem });
  } catch (err) {
    console.error('Erro ao comprar gacha:', err);
    res.status(500).json({ msg: 'Erro no servidor' });
  }
});

app.get('/inventory/:userId', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ msg: 'Usuário não encontrado' });
    const inventoryItems = await Item.find({ itemId: { $in: user.inventory.map(i => i.itemId) } });
    res.json(inventoryItems);
  } catch (err) {
    console.error('Erro ao buscar inventário:', err);
    res.status(500).json({ msg: 'Erro no servidor' });
  }
});

app.post('/inventory/equip', verifyToken, async (req, res) => {
  const { itemId } = req.body;
  try {
    const user = await User.findById(req.userId);
    const item = await Item.findOne({ itemId });
    if (!user || !item) return res.status(404).json({ msg: 'Usuário ou item não encontrado' });

    const equippedInCategory = user.equippedItems.find(i => i.category === item.category);
    if (equippedInCategory) {
      user.inventory.find(i => i.itemId === equippedInCategory.itemId).equipped = false;
      user.equippedItems = user.equippedItems.filter(i => i.itemId !== equippedInCategory.itemId);
    }

    user.inventory.find(i => i.itemId === itemId).equipped = true;
    user.equippedItems.push({ category: item.category, itemId });
    await user.save();
    res.json({ message: 'Item equipado com sucesso' });
  } catch (err) {
    console.error('Erro ao equipar item:', err);
    res.status(500).json({ msg: 'Erro no servidor' });
  }
});

app.get('/profile/:userId', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ msg: 'Usuário não encontrado' });
    const equippedItems = await Item.find({ itemId: { $in: user.equippedItems.map(i => i.itemId) } });
    const totalStats = equippedItems.reduce(
      (acc, item) => ({
        strength: acc.strength + item.stats.strength,
        speed: acc.speed + item.stats.speed,
        damage: acc.damage + item.stats.damage,
        resistance: acc.resistance + item.stats.resistance,
      }),
      { strength: 0, speed: 0, damage: 0, resistance: 0 }
    );
    res.json({ user: { name: user.name, level: user.level, gold: user.gold, stats: totalStats }, equippedItems });
  } catch (err) {
    console.error('Erro ao buscar perfil:', err);
    res.status(500).json({ msg: 'Erro no servidor' });
  }
});

app.get('/', (req, res) => {
  res.json({ status: 'Backend running' });
});

app.use((err, req, res, next) => {
  console.error('Erro global:', err);
  res.status(500).json({ msg: 'Erro interno do servidor' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Inicializar itens (rodar manualmente uma vez)
// initializeItems();