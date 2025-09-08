const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.enable('trust proxy'); // Para HTTPS em produção

// Conexão com MongoDB Atlas
const mongoURI = 'mongodb+srv://rossi_db_user:rossi@cluster0.eevgp7h.mongodb.net/cyberprojekt?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.error('Erro ao conectar MongoDB:', err));

// Schema do usuário
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});
const User = mongoose.model('User', userSchema);

// Rota de registro com validação de duplicatas
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  console.log('Requisição /register recebida:', req.body);

  try {
    // Verificar se email ou nome já existem
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ msg: 'Email já registrado' });
    }
    const existingName = await User.findOne({ name });
    if (existingName) {
      return res.status(400).json({ msg: 'Nome já registrado' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ id: user._id }, 'segredo', { expiresIn: '7d' });
    res.json({ token });
  } catch (err) {
    console.error('Erro ao registrar:', err);
    res.status(500).json({ msg: 'Erro no servidor' });
  }
});

// Rota de login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('Requisição /login recebida:', req.body);

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Usuário não encontrado' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Senha incorreta' });
    }

    const token = jwt.sign({ id: user._id }, 'segredo', { expiresIn: '7d' });
    res.json({ token });
  } catch (err) {
    console.error('Erro ao logar:', err);
    res.status(500).json({ msg: 'Erro no servidor' });
  }
});

// Rota de verificação
app.post('/verify', async (req, res) => {
  const { token } = req.body;
  console.log('Requisição /verify recebida:', token);

  try {
    const decoded = jwt.verify(token, 'segredo');
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ auth: false });
    }
    res.json({ auth: true });
  } catch (err) {
    console.error('Erro ao verificar token:', err);
    res.status(401).json({ auth: false });
  }
});

// Iniciar servidor
app.listen(process.env.PORT || 3000, '0.0.0.0', () => {
  console.log(`Server running on port ${process.env.PORT || 3000} - Acessível em 0.0.0.0:${process.env.PORT || 3000}`);
});