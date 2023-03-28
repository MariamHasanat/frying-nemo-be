import express, { Request, Response } from 'express';
import Item from '../models/item.js';
import { IItem } from '../types/index.js';
import { isNumber } from '../utils/general.util.js';
import itemController from '../controllers/item.controller.js';
import { itemValidate } from '../middlewares/validations/item-validation.middleware.js';

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

router.get(`/:id`, async (req: IItem.Request, res: Response) => {
    const id = req.params.id;

    try {
        const filteredItems = await itemController.getItem(id);

        res.status(200).json(filteredItems);
    } catch (err: any) {
        res.status(400).send(err?.message);
    }
})

router.post(`/`, itemValidate, async (req: IItem.Request, res: Response) => {
    const item = req.body;
    console.log(item)
    try {
        console.log(`r1`)
        const newItem = await itemController.addItem(item);
        console.log(`r2`)
        res.sendStatus(200);
    } catch (err: any) {
        if (err.name == `ValidationError`) {
            if (err.errors.imageURL) {
                console.log(`err1`)
                res.status(400).send("Invalid image URL. Please provide a URL that starts with 'https://'.");
            } else {
                console.log(`err2: `, err);
                res.status(400).send("Error while validating one of your inputs");
            }
        } else {
            console.log(`err3`)
            res.status(400).send(`An error occurred while connecting to the database`);
        }
    }
})

router.delete(`/`, async (req: Request, res: Response) => {
    const filter = req.body;
    const item = await itemController.deleteItem(filter);
    item ? res.sendStatus(200) : res.status(400).send("Item not found");
})

export default router;