import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import { Item } from './models/index';
import { item } from './routers/index';
import { IItem  } from './interfaces/item';

const app: Express = express();
const port = process.env.PORT || 3001;

app.use('/items',item);

export interface IItemRequest extends Express.Request {
  body : IItem 
}

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.get('/createItemTmp', (req: Request, res: Response) => {

  // when you use the postman, the url which you should use is the url for node express application, hence you will use the localhost/3001 , not the url for the server of the mongodb
  const createNewItem = new Item({
    name: "Qatayef",
    category: "desalination",
    ingredients: ["sugar", "cheese", "qatayef dough"],
    description: "something tasty",
    price: 7.5
  })
  createNewItem.save()
    .then(
      () => {
        res.send("item added successfully").end();
      }
    )
    .catch((err : mongoose.Error) => {
      res.status(500).send(err.message).end();
    })
});
app.post('/new-item', (req: IItemRequest, res: Response) => {

  // when you use the postman, the url which you should use is the url for node express application, hence you will use the localhost/3001 , not the url for the server of the mongodb
 console.log(req.body);
 

 if (!req.body.name || !req.body.category){
  return res.status(401).send("name and category are required !").end();
 }
 if(req.body.price && typeof req.body.price !== 'number'){
  return res.status(401).send("price should be number !").end();
 }


  const createNewItem = new Item({
    name: req.body.name ,
    price: req.body.price,
    description: req.body.description,
    category:req.body.category,
    ingredients: req.body.ingredients,
    imageUrl : req.body.imageUrl
  })
  // const createNewItem = new Item({
  //   name: "Qatayef",
  //   category: "desalination",
  //   ingredients: ["sugar", "cheese", "qatayef dough"],
  //   description: "something tasty",
  //   price: 7.5
  // })
  createNewItem.save()
    .then(
      () => {
        res.status(201).send("item added successfully").end();
      }
    )
    .catch((err : mongoose.Error) => {
      console.log(req.body);
      
      res.status(500).send("failed").end();
    })
});



const dbConnect = () => {
  mongoose.connect("mongodb://127.0.0.1:27017/frying-nemo-db")
    .then(
      () => {
        console.log(`⚡️ [server] : connected to mongodb`);

      }
    )
    .catch((error) => {
      console.log(`⚡️ [server] : failed to connect to mongodb ${error}`);
    })
};

app.listen(port, () => {
  console.log(`⚡️ [server]: Server is running at http://localhost:${port}`);
  dbConnect();
});
