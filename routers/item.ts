import { Router, Request, Response } from 'express';
import { MongooseError } from 'mongoose';
import Item from '../models/item';
import { IItemRequest } from '../types/types';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const items = await Item.find();
        res.send({ status: 'OK', items: items });
    } catch (error) {
        console.error(error);
        res.send({ status: 'Failed', items: error });
    }
});

router.post('/', async (req: IItemRequest, res: Response) => {
    if (!req.body.name || !req.body.category) {
        res.status(400).send('Name and Category are required');
        return;
    }
    if (!req.body.price && !(typeof req.body.price !== 'number')) {
        res.status(400).send('Price must be Number');
        return;
    }

    const newItem = new Item({
        name: req.body.name,
        ingredients: req.body.ingredients,
        category: req.body.category,
        price: req.body.price,
        description: req.body.description,
        imageURL: req.body.imageURL
    });

    newItem.save()
        .then(() => {
            res.status(201).send({ status: 'OK', message: 'The item added successfully' });
        })
        .catch((error: MongooseError) => {
            console.error(error.message);
            res.status(500).send({ status: 'Failed', message: 'There is an error and the item is not added' });
        });


});

export default router;