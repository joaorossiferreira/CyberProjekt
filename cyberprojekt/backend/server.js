const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());
app.enable('trust proxy');

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/cyberprojekt';
const jwtSecret = process.env.JWT_SECRET || 'segredo-fallback';

console.log('MONGO_URI definido?', !!process.env.MONGO_URI);

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
  for (const category of categories) {
    const items = await Item.find({ category, type: 'Rotativo', available: true }).limit(3);
    rotationItems.push(...items.map(item => ({ itemId: item.itemId })));
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
    if (!emailRegex.test(String(email).toLowerCase())) {
      return res.status(400).json({ msg: 'EMAIL_INVALID' });
    }
    if (String(password).length < 6) {
      return res.status(400).json({ msg: 'PASSWORD_TOO_SHORT' });
    }
    const existingEmail = await User.findOne({ email: String(email).toLowerCase() });
    if (existingEmail) return res.status(409).json({ msg: 'EMAIL_ALREADY_REGISTERED' });
    const existingName = await User.findOne({ name });
    if (existingName) return res.status(409).json({ msg: 'NAME_ALREADY_REGISTERED' });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({ name, email: String(email).toLowerCase(), password: hashedPassword });
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
    const user = await User.findOne({ email: String(email).toLowerCase() });
    if (!user) return res.status(401).json({ msg: 'USER_NOT_FOUND' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ msg: 'INVALID_PASSWORD' });
    const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: '7d' });
    res.json({ token });
  } catch (err) {
    console.error('Erro ao logar:', err);
    res.status(500).json({ msg: 'Erro no servidor' });
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