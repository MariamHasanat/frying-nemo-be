import express from 'express';
import mongoose from 'mongoose';
import Item from '../models/item';
import { IItemRequest  } from './../interfaces/item';

const router = express.Router();
router.use(express.json());

router.get('/', async (req, res) => {
    // it is like select all documents and return it ...  
  const items = await Item.find();
  res.status(201).send(items);
});

router.post('/', (req: IItemRequest, res) => {


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
  
  createNewItem.save() // will save the item in db  
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

export default router ;