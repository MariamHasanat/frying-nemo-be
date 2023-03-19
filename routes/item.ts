import express from "express";
import {validateItem} from "../middlewars/item-validation.js"
import { MenuItem } from "../type/index.js";
import itemController from  '../controllers/item.js';

const router = express.Router();


router.get('/', async(req, res) =>{
  try {
    const items = await itemController.getItems(req.query);
    res.status(200).send(items);
  }catch (error){
    res.status(500).send('failed to find items!')
  }
});

router.post('/',validateItem, async(req:MenuItem.ItemRequest, res) =>{
    try {
        await itemController.createItem(req);
        res.status(201).send();
      }catch (error){
        res.status(500).send('failed to add items!')
      }
    });

export default router