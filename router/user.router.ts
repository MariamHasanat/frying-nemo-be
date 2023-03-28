import express from 'express'
import itemsController from '../controller/items.controller.js';
import validate from '../middleWare/items-validate.js';
import { MenuItem } from '../Type/index.js';


const router = express.Router();


router.post('/' ,validate, async (req : MenuItem.ItemRequest , res ) => {

 try{
  await itemsController.creatItems(req);
  res.status(201).send();
 }catch {
    res.status(500).send("Failed to add item!");
  }
});


export default router