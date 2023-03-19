import express from 'express'
import Item from '../models/item.models.js'
import itemsController from '../controller/items.controller.js';
import validate from '../middleWare/items-validate.js';
import { IItemRequest } from '../Type/index.js';


const router = express.Router();
router.get('/', async (req, res) => {
  const items = await itemsController.getItems(req.query);
  res.status(200).send(items);
})

router.post('/' ,validate, async (req : IItemRequest , res ) => {

 try{
  await itemsController.creatItems(req);
  res.status(201).send();
 }catch {
    res.status(500).send("Failed to add item!");
  }
});

export default router