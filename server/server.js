// server.js
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const app = express();

app.use(bodyParser.json());

const SECRET = 'segredo_supersecreto';

// Simulando banco de dados simples
const users = [
  {
    id: '1',
    email: 'usuario@exemplo.com',
    passwordHash: bcrypt.hashSync('123456', 10)
  }
];

// Middleware para autenticar token JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user; // { id: '1', email: '...' }
    next();
  });
}

// Rota de login
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (!user) return res.status(401).json({ message: 'Usuário não encontrado' });

  if (!bcrypt.compareSync(password, user.passwordHash)) {
    return res.status(401).json({ message: 'Senha incorreta' });
  }

  const accessToken = jwt.sign({ id: user.id, email: user.email }, SECRET, { expiresIn: '1h' });
  res.json({ accessToken, user: { id: user.id, email: user.email } });
});

// Rota para atualizar senha protegida por token
app.put('/users/:id/password', authenticateToken, (req, res) => {
  const { id } = req.params;
  const { password } = req.body;

  if (req.user.id !== id) return res.status(403).json({ message: 'Acesso negado' });

  if (!password || password.length < 6) {
    return res.status(400).json({ message: 'Senha deve ter ao menos 6 caracteres' });
  }

  const user = users.find(u => u.id === id);
  if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

  user.passwordHash = bcrypt.hashSync(password, 10);
  res.json({ message: 'Senha atualizada com sucesso' });
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
