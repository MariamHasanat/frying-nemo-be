import { Router, Request, Response } from 'express';
import { MenuItems } from '../types/item.type';
import itemController from '../controllers/item.controller';
import { itemValidation } from '../middleware/index';
import { Status } from '../classes/status';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const items = await itemController.getItems(req.query);
        res.send(new Status(200, '', { total: items.length, items }));
    } catch (error) {
        res.status(500).send(new Status(500, 'Failed, There is an error and the item is not added', {}));
    }
});

router.post('/', itemValidation, async (req: MenuItems.IRequest, res: Response) => {
    try {
        await itemController.createItem(req);
        res.status(201).send(new Status(201, 'OK, The item added successfully'));
    }
    catch (error) {
        console.error(error);
        res.status(500).send(new Status(500, 'Failed, There is an error and the item is not added'));
    };
});

export default router;
