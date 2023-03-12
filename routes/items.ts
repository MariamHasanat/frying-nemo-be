import { Router } from 'express'
import Item from '../models/item';
import { IItemRequest } from '../types/index';

const router = Router();

/**
 * returns a list of items
 */
router.get('/', async (req, res) => {
    const items = await Item.find();
    res.send(items);
});

/**
 * create an item
 */
router.post('/', (req: IItemRequest, res) => {
    if (req.headers['content-type'] !== 'application/json') {
        res.status(400).send('Expecting JSON data');
        return;
    }

    const body = req.body;
    if (!body.name || !body.price || !body.category) {
        res.status(400).send('name, price and category are required!');
        return;
    }

    const newItem = new Item({
        name: body.name,
        category: body.category,
        price: body.price,
        ingredients: body.ingredients,
        description: body.description,
        imageURL: body.imageURL
    })

    newItem.save()
        .then(() => {
            res.send('successfully added');
        })
        .catch((err) => {
            res.status(500).send(`something went wrong\n${err}`);
        })
});

export default router;