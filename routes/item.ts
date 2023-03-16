import express from "express";
import mongoose from "mongoose";
import Item from "../models/item.js";
import { ItemRequest } from "../type/index.js";
import itemController from  '../controllers/item.js';

const router = express.Router();


router.get('/', async(req, res) =>{
    const items = await itemController.getItems(req.query);
    res.send(items)
});

router.post('/', async(req: ItemRequest, res) =>{
    if (!req.body.name || !req.body.category ){
        return res.status(400).send("name and category are required!");
    }
    if (!req.body.price && typeof req.body){
        return res.status(400).send("name and category are required!");
    }
    const newItem = new Item({
        name:req.body.name,
        category:req.body.category,
        ingredients: req.body.ingredients,
        description: req.body.description,
      });

      newItem.price = req.body.price || 10;

      newItem.save()
         .then(()=>{
            res.status(201).send()
         })
         .catch((err:mongoose.Error)=>{
            console.error(err.message);
            res.status(500)
         })
});

export default router