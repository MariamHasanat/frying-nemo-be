import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Item from './models/item.js';
import router from './routes/item.js';


dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;


app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server + Hello World');
});

app.get('/createItem', (req: Request, res: Response) => {

  const newItem = new Item({
    name: 'Maklooba',
    category: 'Main',
    ingredients: ['fh', 'gsdg', 'sdgs'],
    description: 'hfkhfiakwj',
    price: 23
  });
  newItem.save().then(()=>{
    res.send("Item should ba added")
  })
  .catch((err: mongoose.Error) =>{
    res.status(500).send("faild to add")
  })
 
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  dbConnect();
});

const dbConnect = () =>{
  mongoose.connect("mongodb://localhost:27017/frying-nemo")
  .then(()=>{
    console.log(`🤣 [server]: conneect to MongoDB`)
  })
  .catch((err)=>{
    console.log(`😔 [server]:Faild conneect to MongoDB ${err}`)
  })
}