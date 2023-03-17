import express from 'express';
import mongoose from 'mongoose';
import Item from '../models/item-schema';
import { IMenuItem } from '../interfaces/menuItems-interface';
import itemController from '../controllers/items-controller'

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


  const createNewItem = itemController.createItems(req.body);
  // will save the item in db  
  createNewItem.save()
    .then(
      () => {
        res.status(201).send("item added successfully").end();
      }
    )
    .catch((err: mongoose.Error) => {
      console.log(err);

      res.status(500).send("failed").end();
    })
});

export default router;