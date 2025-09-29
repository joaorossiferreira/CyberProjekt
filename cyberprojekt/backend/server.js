const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors({ origin: '*' })); // Restringa em prod se necessário
app.use(express.json());
app.enable('trust proxy');

// Vars de ambiente com fallback (para debug)
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/cyberprojekt'; // Fallback local
const jwtSecret = process.env.JWT_SECRET || 'segredo-fallback'; // NÃO use em prod!

console.log('MONGO_URI definido?', !!process.env.MONGO_URI); // Log para debug

// Conexão cached (serverless-friendly)
let cachedConnection = null;
async function connectToDatabase() {
  if (cachedConnection) {
    return cachedConnection;
  }

  try {
    console.log('Conectando ao MongoDB...');
    const conn = await mongoose.connect(mongoURI, {
      bufferCommands: false, // Evita buffering em serverless
      maxPoolSize: 10, // Limita conexões
      serverSelectionTimeoutMS: 5000, // Timeout rápido (5s)
      socketTimeoutMS: 45000, // 45s para operações
      family: 4, // IPv4 only
    });
    cachedConnection = conn;
    console.log('MongoDB conectado com sucesso');
    return conn;
  } catch (err) {
    console.error('Erro ao conectar MongoDB:', err.message);
    throw err; // Propaga para handler de erro
  }
}

// Schema (sem mudanças)
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});
const User = mongoose.model('User', userSchema);

// Middleware para garantir conexão por request
app.use(async (req, res, next) => {
  try {
    await connectToDatabase();
    next();
  } catch (err) {
    res.status(500).json({ msg: 'Erro de conexão com banco de dados' });
  }
});

// Rotas (sem grandes mudanças, mas com await conexão)
app.post('/register', async (req, res) => {
  await connectToDatabase(); // Garante conexão
  const { name, email, password } = req.body;
  console.log('Requisição /register:', { name, email });

  try {
    const existingEmail = await User.findOne({ email });
    if (existingEmail) return res.status(400).json({ msg: 'Email já registrado' });
    const existingName = await User.findOne({ name });
    if (existingName) return res.status(400).json({ msg: 'Nome já registrado' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({ name, email, password: hashedPassword });
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
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Usuário não encontrado' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Senha incorreta' });

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

app.get('/', (req, res) => {
  res.json({ status: 'Backend running' });
});

// Error handler global
app.use((err, req, res, next) => {
  console.error('Erro global:', err);
  res.status(500).json({ msg: 'Erro interno do servidor' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});