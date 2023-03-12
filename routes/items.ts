import express, { Express, Request, Response } from 'express';
import Item from '../models/item.js';

const router = express.Router();

router.post(`/`, async (req: Request, res: Response) => {
    const { name, imageURL, description, price, category, ingredients, addedBy } = req.body;

    const newItem = new Item({ name, imageURL, description, price, category, ingredients, addedBy })
    newItem.save().then(() => {
        res.sendStatus(200);
        console.log(`Successfully added item: `, newItem);
    }).catch(() => {
        res.sendStatus(500);
        console.log(`An error happened while adding item`);
    });
})

router.get(`/id`, async (req: Request, res: Response) => {
    const { itemId } = req.body;
    try {
        const item = await Item.findOne({ id: itemId });
        res.status(200).json(item);
    } catch {
        res.sendStatus(400);
    }
})

export default router;