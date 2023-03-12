import express from "express";
import mongoose from "mongoose";
import Item from "../models/item";
import { IItemRequest } from "../types/index";

const router = express.Router();

router.get('/', async (req, res) => {
    const items = await Item.find();
    res.send(items)
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