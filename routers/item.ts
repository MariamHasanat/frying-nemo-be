import express from 'express';
import mongoose from 'mongoose';
import Item from '../models/item';
import { IMenuItem } from './../interfaces/item';
import itemController from './../controllers/get-items'

const router = express.Router();
router.use(express.json());

router.get('/', async (req, res) => {
  // it is like select all documents and return it filtered by query 
  const items = await itemController.getItems(req.query);
  res.status(201).send(items);

});


router.post('/', (req: IMenuItem.IItemRequest, res) => {
  if (!req.body.name || !req.body.category) {
    return res.status(401).send("name and category are required !").end();
  }
  if (req.body.price && typeof req.body.price !== 'number') {
    return res.status(401).send("price should be number !").end();
  }


  const createNewItem = new Item({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    category: req.body.category,
    ingredients: req.body.ingredients,
    imageUrl: req.body.imageUrl
  })
  // will save the item in db  
  createNewItem.save() 
    .then(
      () => {
        res.status(201).send("item added successfully").end();
      }
    )
    .catch((err: mongoose.Error) => {
      console.log(req.body);

      res.status(500).send("failed").end();
    })
});

export default router;