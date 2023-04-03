import express, { Router, Response } from 'express';
import { MenuItemsNS } from '../types/item.type';
import itemController from '../controllers/item.controller';
import itemValidators from '../middleware/item-validation';
import { Status } from '../classes/status';

const router = Router();

router.get('/', async (req: MenuItemsNS.IRequest, res: express.Response) => {
    try {
        const items = await itemController.getItems(req.query);
        res.send(new Status(200, '', { total: items.length, items }));
    } catch (error) {
        console.error(error);
        res.status(500).send(new Status(500, 'Failed, There is an error and the item is not added', {}));
    }
});

router.get('/:id', itemValidators.itemIdValidation, async (req: MenuItemsNS.IRequest, res: express.Response) => {
    try {
        const item = await itemController.getItem(req);
        res.send(item);
    } catch (error) {
        console.error(error);
        res.status(500).send(new Status(500, 'Failed, There is an error and the item is not added', {}));
    }
});

router.post('/', itemValidators.itemValidation, async (req: MenuItemsNS.IRequest, res: Response) => {
    try {
        await itemController.createItem(req);
        res.status(201).send(new Status(201, 'OK, The item added successfully'));
    }
    catch (error) {
        console.error(error);
        res.status(500).send(new Status(500, 'Failed, There is an error and the item is not added'));
    };
});

router.delete('/:id', async (req: MenuItemsNS.IRequest, res: Response) => {
    
    const deleteVal = await itemController.deleteItem(req.params.id);
    res.status(deleteVal.status).send(deleteVal);

});

export default router;
