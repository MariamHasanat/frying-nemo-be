import express from "express";
import mongoose from "mongoose";
import Item from "../models/item.moudel";
import { IItemRequest } from "../types/index";
import itemController from "../controllers/items.controllers.js"
const router = express.Router();

router.get('/', async (req, res) => {
    const items = await itemController.getItems(req.query);
    //select all from table
    res.status(200).send(items)
})

router.post('/', async (req: IItemRequest, res) => {
    if (!req.body.name || !req.body.category) {
        return res.status(400).send("Name and Category are required ")
    }
    if (!req.body.price && typeof req.body.price !== "number") {
        return res.status(400).send("price must be a number")
    }

    const newItem = new Item({
        name: req.body.name,
        category: req.body.category,
        ingredients: req.body.ingredients,
        description: req.body.description,
        price: req.body.price
    });

    newItem.save()
        .then(() => {
            res.send("Item is Added")
        })
        .catch((err: mongoose.Error) => {

            res.status(500).send("Failed to add this item  :( " + err.message);
        })

})
export default router;