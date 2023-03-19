import express from "express";
import mongoose from "mongoose";
import itemController from "../controllers/item.controllers";
import validateItem from "../middlewares/item-validation";
import Item from "../models/item.model";
import { IItemRequest } from "../types/index";
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const items = await itemController.getItems(req.query);
        res.status(200).send(items);
    } catch (error) {
        res.status(500).send("Failed to find item 😭");
    }

});
router.post('/', validateItem, async (req: IItemRequest, res) => {
    try {
        await itemController.createItem(req);
        res.status(201).send("Item is added 🔥 ");
    } catch (error) {
        res.status(500).send("Failed to add 😭");
    }
})
export default router;