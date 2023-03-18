import express, { query } from "express";
import Item from "../models/items.js";
import { IItem as IItemRequest } from '../dist/Types/index.js';
import itemControl from "../controllers/item.control.js";
import { IItemQuery } from '../dist/Types/index.js';



const routes = express.Router()

routes.get('/', async (req, res) => {

    const items = await itemControl.getItems(req.query)
    res.status(200).send(items)
})

routes.post("/", async (req, res) => {
    const items = await itemControl.createItem(req.body, res)

    const newItems = new Item(items)
    newItems.save()
        .then(() => {
            res.status(201).send("Item created successful")
        }).catch(() => {
            res.status(400).send("Failed to create Item")
        })


})

export default routes