import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Item from './models/item.js';
import router from './routes/items.js';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;
app.use(express.json())
app.use('/items',router)
app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server + Hello World');
});


app.get('/CreateTemp', (req: Request, res: Response) => {
  const newItem = new Item({
    name: 'test',
    category: 'Main Dish',
    ingredients: ['rice', 'water', 'salt', 'meat'],
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam architecto illo facere, officiis ab, vitae itaque voluptatem repudiandae perspiciatis',
    price: 20.5
  });

  newItem.save()
    .then(() => {
      res.send("Item is Added")
    })
    .catch((err: mongoose.Error) => {

      res.status(500).send("Failed to add this item  :( " + err.message);
    })


});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://127.0.0.1:${port}`);
  dbConnect();

});
const dbConnect = () => {

  mongoose.connect("mongodb://127.0.0.1:27017/frying-nemo")
    .then(() => {
      console.log(`[server]: Connect to MongoDB :)`)
    }).catch((err) => {
      console.log(`[server]: failed to connect :( ${err}`)

    })


}