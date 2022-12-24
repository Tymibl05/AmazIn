import express from 'express';
import bcrypt from 'bcryptjs';
import { generateToken, isAuth } from './utils.js';
import path from 'path';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { connectDb, getCol } from './db/mongo.js';
import { ObjectId } from 'mongodb';
dotenv.config();

const port = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(cors());
app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
  connectDb();
});

// const __dirname = path.resolve();
const dir = path.resolve();
const __dirname = dir.slice(0, -8); //remove /backend from pathname
console.log(__dirname);

app.use(express.static(path.join(__dirname, './frontend/build')));
app.get('/api', (req, res) =>
  res.sendFile(path.join(__dirname, './frontend/build/index.html'))
);

// USERS
// app.get('/api/users', async (req, res) => {
//   try {
//     const col = await getCol('users');
//     const users = await col.find().toArray();
//     res.send(users);
//   } catch (error) {
//     console.log(error);
//   }
// });
app.post('/api/users/signup', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const col = await getCol('users');
    const user = await col.insertOne({
      id: '',
      name: name,
      email: email,
      password: bcrypt.hashSync(password),
      is_admin: false,
    });
    res.send({
      id: user.insertedId,
      name: name,
      email: email,
      is_admin: false,
      token: generateToken({
        _id: user.insertedId,
        name: name,
        email: email,
        is_admin: false,
      }),
    });
    return;
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
          id: user._id,
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
app.patch(
  '/api/users/profile',
  (req, res, next) => isAuth(req, res, next),
  async (req, res) => {
    const { name, email, password } = req.body;
    const value = password
      ? {
          name: name,
          email: email,
          password: bcrypt.hashSync(password),
        }
      : {
          name: name,
          email: email,
        };
    try {
      const col = await getCol('users');
      const update = await col.updateOne(
        { _id: ObjectId(req.user.id) },
        { $set: value }
      );
      console.log(update);
      res.send(update);
    } catch (error) {
      res.status(401).send({ message: 'Error on update' });
    }
  }
);

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
    res.send(error);
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

// ORDERS
// app.get('/api/orders/', async (req, res) => {
//   try {
//     const col = await getCol('orders');
//     const orders = await col.find().toArray();
//     res.send(orders);
//   } catch (error) {
//     res.send(error);
//   }
// });
app.get(
  '/api/orders/mine/',
  (req, res, next) => isAuth(req, res, next),
  async (req, res) => {
    try {
      const col = await getCol('orders');
      const orders = await col.find({ user: req.user.id }).toArray();
      if (!orders) {
        res.status(404).send({ message: 'Orders Not Found' });
      } else {
        res.send(orders);
      }
    } catch (error) {
      res.send(error);
    }
  }
);
app.get(
  '/api/orders/:id',
  (req, res, next) => isAuth(req, res, next),
  async (req, res) => {
    try {
      const col = await getCol('orders');
      const order = await col.findOne({ _id: ObjectId(req.params.id) });
      if (!order || order.user !== req.user.id) {
        res.status(404).send({ message: 'Order Not Found' });
      } else {
        res.send(order);
      }
    } catch (error) {
      res.send(error);
    }
  }
);
app.post(
  '/api/orders/',
  (req, res, next) => isAuth(req, res, next),
  async (req, res) => {
    try {
      const col = await getCol('orders');
      const newOrder = await col.insertOne({
        ...req.body,
        user: req.user.id,
        createdAt: Date.now(),
      });
      res.send(newOrder);
    } catch (error) {
      res.status(401).send({ message: error });
    }
  }
);

// UTILS
// app.post('/api/clear-orders/', async (req, res) => {
//   try {
//     const col = await getCol('orders');
//     col.deleteMany();
//     res.send('Orders cleared');
//   } catch (error) {
//     res.send(error);
//   }
// });
// app.post('/api/clear-users/', async (req, res) => {
//   try {
//     const col = await getCol('users');
//     col.deleteMany();
//     res.send('users cleared');
//   } catch (error) {
//     res.send(error);
//   }
// });
// app.post('/api/seed', async (req, res) => {
//   try {
//     const col = await getCol('products');
//     const products = await col.find().toArray();
//     res.send(products);
//   } catch (error) {
//     res.send(error);
//   }
// });
