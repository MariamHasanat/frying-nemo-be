import express from "express";
import mongoose from "mongoose";
import itemController  from "../controllers/item.controllers";
import Item from "../models/item.model";
import { IItemRequest } from "../types/index";
const router = express.Router();

router.get('/',async (req,res)=>{
    const items = await itemController.getItems(req.query);
    res.status(200).send(items);
});
router.post('/',async(req: IItemRequest,res)=>{
    if(!req.body.name || !req.body.category){
        return res.status(400).send("Name and category are required");
    }
    if (req.body.price && typeof req.body.price !== 'number') {
        return res.status(400).send("Price must be number");
    }
    const newItem = new Item({
        name:req.body.name,
        price:req.body.price,
        ingredients:req.body.ingredients,
        description:req.body.description,
        category:req.body.category
      });
      newItem.save()
      .then(()=>res.status(201).send("Item is added 🔥 "))
      .catch((err:mongoose.Error)=>res.status(500).send("Failed to add 😭" + err.message))
});
export default router;