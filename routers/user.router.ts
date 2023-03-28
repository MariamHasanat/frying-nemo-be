import express, { Router, Response } from 'express';
import { MenuItems } from '../types/item.type';
import itemController from '../controllers/item.controller';
import itemValidators from '../middleware/item-validation';
import { Status } from '../classes/status';

const router = Router();

router.post('/', async (req: any, res: Response) => {
    try {
        await itemController.createItem(req);
        res.status(201).send(new Status(201, 'OK, The user added successfully'));
    }
    catch (error) {
        console.error(error);
        res.status(500).send(new Status(500, 'Failed, There is an error and the item is not added'));
    };
});



export default router;
