import { Router } from 'express'
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
 * returns an items by id
 */
router.get('/:id', itemValidation.validateItemId, async (req: MenuItem.IItemRequest, res) => {
    // 1. add middleware to check if id is valid (mongoose.isValidObjectId...)
    const id = req.params.id;

    const item = await itemController.getItemById(id);
    if (item) {
        res.send(item);
        return;
    }
    else {
        res.status(400).send('item not found');
    }


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

/**
 * returns a list of items
 */
router.delete('/:id', itemValidation.validateItemId, (req, res) => {
    const id = req.params.id;
    itemController.deleteItemById(id).then(
        (item) => {
            if (item)
                res.send(`successfully deleted the following item\n${item}`);
            else
                res.send(`item does not exist`)
        }
    )
})

export default router;