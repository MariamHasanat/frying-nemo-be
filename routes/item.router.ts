import { Router } from 'express'
import Item from '../models/item.model';
import { MenuItem } from '../types/index';
import { itemController } from '../controllers/index'
import itemValidation from '../middleware/item-validation';

const router = Router();

/**
 * returns a list of items
 */
router.get('/', async (req: MenuItem.IItemRequest, res) => {
    const items = await itemController.getItems(req.query);
    res.send(items);
});

/**
 * create an item
 */
router.post('/', itemValidation.validateItem, (req: MenuItem.IItemRequest, res) => {
    const body = req.body;

    itemController.createItem(body)
        .then(() => {
            res.send('successfully added');
        })
        .catch((err) => {
            res.status(500).send(`something went wrong\n${err}`);
        })
});

export default router;