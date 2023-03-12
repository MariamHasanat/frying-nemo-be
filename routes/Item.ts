import express from "express";
import Item from "../models/items.js";
import { IItemRequest } from '../dist/Types/index.js';


const routes = express.Router()

routes.get('/', async (req, res) => {
    const items = await Item.find()
    res.status(200).send(items)
})

routes.post("/", async (req, res) => {
    const body: IItemRequest = req.body;
    if (!body.name || !body.category)
        return res.status(400).send("Name or Category not found and there are required")
    if (body.price && typeof body.price !== "number")
        return res.status(400).send("Price must be a number")
    const NewItem = new Item({
        name: req.body.name,
        category: req.body.category,
        ingredients: body.ingredients,
        description: body.description,
        price: body.price
    }).save()
        .then(() => {
            res.status(201).send("Item created successful")
        }).catch(() => {
            res.status(400).send("Failed to create Item")
        })


})

export default routes