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

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  level: { type: Number, default: 1 },
  currentExp: { type: Number, default: 0 },
  gold: { type: Number, default: 0 },
});
const User = mongoose.model('User', userSchema);

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