import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { item } from './models/index.js'

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server + Hello World');
});

app.get('/crateItem', (req: Request, res: Response) => {
  const newItem = new item({
    name: 'Maklooba!',
    category: 'Main Dish',
    price: 20.5,
    ingredients: ['some stuff']
  })
  newItem.save().then(()=> {
    res.send('successfully added');
  })
  .catch((err) => {
    res.status(500).send(`something went wrong\n${err}`);
  })

});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  connectToDB();
});

const connectToDB = () => {
  console.log("connecting")
  mongoose.connect("mongodb://127.0.0.1:27017/frying-nemo")
    .then(() => console.log('successfully connected to database!'))
    .catch((err) => console.log(`something went wrong ;-(\n${err}`))
}