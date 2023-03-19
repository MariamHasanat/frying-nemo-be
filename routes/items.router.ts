import express from "express";
import mongoose from "mongoose";
import Item from "../models/item.moudel";
import { MenuItems } from "../types/index";
import itemController from "../controllers/items.controllers.js"
import validItem from "../middleware/item-validation";
const router = express.Router();

router.get('/', async (req, res) => {
    try {

        const items = await itemController.getItems(req.query);
        //select all from table
        res.status(200).send(items)
    } catch (error) {
        res.status(500).send("failed to find this item !!")
    }
})

router.post('/', validItem, async (req: MenuItems.ItemRequest, res) => {
    try {
        await itemController.createItems(req);
        res.status(201).send();

    } catch (error) {
        res.status(500).send("faild to add item")
    }

})
export default router;