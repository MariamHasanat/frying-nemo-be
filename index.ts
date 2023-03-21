import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { Item } from './models/index.js';
import itemRouter from './router/items.router.js'

const app: Express = express();
const port = process.env.PORT || 3001;
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  res.send('Your Server is working fine!');
});

app.use('/items', itemRouter)
app.get('/createItemTmp', (req: Request, res: Response) => {

  const newItem = new Item({
    name: 'Heborn Qidra',
    category: 'Main Dish',
    ingredients: ['rice', 'water', 'salt', 'chicken'],
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam architecto illo facere, officiis ab, vitae itaque voluptatem repudiandae perspiciatis',
    price: 20.5
  },

  );

  newItem.save()
    .then(() => {
      res.send("Item is Added :/");
    })
    .catch((err: mongoose.Error) => {
      res.status(500).send("Failed to add :( " + err.message);
    })
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://127.0.0.1:${port}`);
  dbConnect();
});

const dbConnect = () => {
  console.log("connecting to db...");
  mongoose.connect("mongodb://127.0.0.1:27017/frying-nemo")
    .then(() => {
      console.log(`🤗 [server]: Connected to MongoDB`);
    })
    .catch((err) => {
      console.log(`🤨 [server]: Failed to connect to mongodb ${err}`);
    });
}