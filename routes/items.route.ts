import express, { Request, Response } from 'express';
import Item from '../models/item.js';
import { IItem } from '../types/index.js';
import { isNumber } from '../utils/general.util.js';
import itemController from '../controllers/item.controller.js';

const router = express.Router();

router.get(`/`, async (req: IItem.Request, res: Response) => {
    const filter: IItem.Query = req.query;

    try {
        const filteredItems = await itemController.getItems(filter);
        
        res.status(200).json(filteredItems);
    } catch (err: any) {
        res.status(400).send(err?.message);
    }
})

router.post(`/`, async (req: IItem.Request, res: Response) => {
    const item = req.body;
    const { name, imageURL, description, price, category, ingredients, addedBy } = item;

    if (!name || !price || !category) {
        res.status(400).send("You must provide all required parameters (name, price, category), and price must be a valid number");
        return;
    }

    if (!isNumber(price)) {
        res.status(400).send("Price must be a valid number");
        return;
    } 

    try {
        const newItem = await itemController.addItem(item);
        res.sendStatus(200);
    } catch (err: any) {
        if (err.name == `ValidationError`) {
            if (err.errors.imageURL) {
                res.status(400).send("Invalid image URL. Please provide a URL that starts with 'https://'.");
            } else {
                res.status(400).send("Error while validating one of your inputs");
            }
        } else {
            res.status(400).send(`An error occurred while connecting to the database`);
        }
    }
})

router.delete(``, async (req: Request, res: Response) => {
    const filter = req.body;
    const item = await itemController.deleteItem(filter);
    item ? res.sendStatus(200) : res.status(400).send("Item not found");
})

export default router;