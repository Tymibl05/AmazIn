import express from 'express';
import bcrypt from 'bcryptjs';
// import { data } from './data.js';
import { generateToken } from './utils.js';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { connectDb, getCol } from './db/mongo.js';
dotenv.config();

const port = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(cors());
app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
  connectDb();
});

// app.post('/setdb', async (req, res) => {
//   try {
//     const userCol = await getCol('users');
//     const productCol = await getCol('products');
//     userCol.insertMany(data.users);
//     productCol.insertMany(data.products);
//     res.send('db set');
//   } catch (error) {
//     console.log(error);
//   }
// });

// USERS
app.get('/api/users', async (req, res) => {
  try {
    const col = await getCol('users');
    const users = await col.find().toArray();
    res.send(users);
  } catch (error) {
    console.log(error);
  }
});
app.post('/api/users/signin', async (req, res) => {
  try {
    const col = await getCol('users');
    const user = await col.findOne({ email: req.body.email });
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
  } catch (error) {
    console.log(error);
  }
});

// PRODUCTS
app.get('/api/products', async (req, res) => {
  try {
    const col = await getCol('products');
    const products = await col.find().toArray();
    res.send(products);
  } catch (error) {
    res.send(error);
  }
});
app.get('/api/products/slug/:slug', async (req, res) => {
  try {
    const col = await getCol('products');
    const product = await col.findOne({ slug: req.params.slug });
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  } catch (error) {
    console.log(error);
  }
});
app.get('/api/products/:id', async (req, res) => {
  try {
    const col = await getCol('products');
    const product = await col.findOne({ _id: req.params.id });
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  } catch (error) {
    res.send(error);
  }
});
