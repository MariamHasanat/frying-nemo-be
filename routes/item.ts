import express from "express";
import {validateItem, validateItemId} from "../middlewars/item-validation.js"
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

router.get('/:id', validateItemId, async (req: MenuItem.ItemRequest, res:express.Response<MenuItem.Item | null>)=>{
  try {
    const item = await itemController.getItemById(req.params.id);
    res.status(200).send(item);
  } catch (error) {
    res.status(500).send();
  }
})
router.post('/',validateItem, async(req:MenuItem.ItemRequest, res) =>{
    try {
        await itemController.createItem(req);
        res.status(201).send();
      }catch (error){
        res.status(500).send('failed to add items!')
      }
    });

export default router