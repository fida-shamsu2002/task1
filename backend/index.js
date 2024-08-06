const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

let users = []; // In-memory storage for user data

app.use(cors());
app.use(bodyParser.json());

app.post('/signup', (req, res) => {
  const { name, email, password } = req.body;

  const userExists = users.find(user => user.email === email);
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  users.push({ name, email, password });
  const token = jwt.sign({ email }, 'secretkey', { expiresIn: '1h' });
  res.json({ token });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
