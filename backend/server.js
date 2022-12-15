import express from 'express';
import bcrypt from 'bcryptjs';
import { data } from './data.js';
import { generateToken } from './utils.js';
import cors from 'cors';
import * as dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(cors());
app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});

// USERS
app.get('/api/users', (req, res) => {
  res.send(data.users);
});
app.post('/api/users/signin', (req, res) => {
  const user = data.users.filter((user) => user.email === req.body.email)[0]; // findOne()
  if (user) {
    if (bcrypt.compareSync(req.body.password, user.password)) {
      res.send({
        id: user.id,
        name: user.name,
        email: user.email,
        is_admin: user.is_admin,
        token: generateToken(user),
      });
      return;
    }
  }
  res.status(401).send({ message: 'Invalid email or password' });
});

// PRODUCTS
app.get('/api/products', (req, res) => {
  res.send(data.products);
});
app.get('/api/products/slug/:slug', (req, res) => {
  const product = data.products.find((x) => x.slug === req.params.slug);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});
app.get('/api/products/:id', (req, res) => {
  const product = data.products.find((x) => x._id === req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});
