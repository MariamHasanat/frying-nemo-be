import express from 'express';
import mongoose from 'mongoose';
import Item from '../models/item.models';
import { IItemRequest } from '../types/index';
import itemController from "../controllers/item.controlles";
import { validateItem } from '../middlewares/item-validation';
const router = express.Router();


router.get('/', async (req:IItemRequest, res) => {
  try{
    const items = await itemController.getItems(req.query);
    res.status(200).send(items);}
  catch(error ){
    res.status(500).send("failed to find items");
  }
 
});

router.post('/', async (req: IItemRequest, res) => {
  try{
    await itemController.creatItem(req)
    res.status(201).send();
  }catch(error){
    res.status(500).send("failed to add items");
  }
});

export default router;