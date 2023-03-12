import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import Item from './models/item.js';

const app: Express = express();
const port = process.env.PORT || 3001;

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server + Hello World');
});
app.get('/createItemTmp', (req: Request, res: Response) => {
  const newItem = new Item({
    name:'Lemon juice',
    price:20,
    ingredients:["Lemon" , "water" , "sugar"],
    description:"This juice in very important for you",
    category:"juice"
  });
  newItem.save().then(()=>res.send("Item is added 🔥 "))
  .catch((err:mongoose.Error)=>res.status(500).send("Failed to add 😭" + err.message))
});


app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  dbConnect();
});
const dbConnect = ()=>{
  mongoose.connect("mongodb://127.0.0.1:27017/frying-nemo").then(()=>{
    console.log(`🎉[server]: connect to DB`);
  }).catch((error)=>{
    console.log(`😢[server]: Failed to connect to mongodb ${error}`);
  }
  )
}
