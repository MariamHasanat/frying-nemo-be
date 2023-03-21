
import express, { Express, Request, Response } from 'express';
import cors from 'cors' ;
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { Item } from './models/index.js';
import itemsRouter from './routes/items.js';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json())
app.use('/items' , itemsRouter)

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.get('/createItem', (req, res) => {
  const newItem = new Item({
    name: "Maqlooba",
    price: 40,
    ingredients: ["rice", "chicken"],
    description: "The best dish that you may eat in the world :)"
  })
  newItem.save()
    .then(() => {
      res.send("Item is added into the data base :)")
    })
    .catch(error => {
      res.status(500).send("Something went wrong, item not added")
    })
})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  dbConnect();
});

const dbConnect = () => {
  console.log("connecting to the data base ...");

  mongoose.connect("mongodb://127.0.0.1:27017/frying-nemo") // this function accepts uri string that consists of this parts : mongodb://host-name:port/DB-name
    .then(() => {
      console.log("Server connected to the data base successfully !")
    }).catch(() => {
      console.log("Server faild to connet to the data base :(");
    })
}