import express, { Express, Request, Response } from 'express';
import Item from '../models/item.js';
import { IItem } from '../types/index.js';

const router = express.Router();

interface IRequest extends Request {
    body: IItem,
}

router.post(`/`, async (req: IRequest, res: Response) => {
    const { name, imageURL, description, price, category, ingredients, addedBy } = req.body;

    const newItem = new Item({ name, imageURL, description, price, category, ingredients, addedBy })
    newItem.save().then(() => {
        res.sendStatus(200);
    }).catch(() => {
        res.status(400).send(`An error occurred while connecting to the database`);
        console.log(`An error happened while adding item`);
    });
})

router.get(`/:itemId`, async (req: Request, res: Response) => {
    const { itemId } = req.params;
    try {
        await Item.findOne({ _id: itemId });
        res.status(200);
    } catch (err: any) {
        res.status(400).send(err?.message);
    }
})

router.delete(`/:itemId`, async (req: Request, res: Response) => {
    const { itemId } = req.params;
    const item = await Item.findOneAndDelete({ _id: itemId });
    item? res.sendStatus(200) : res.status(400).send("Item not found");
})

export default router;