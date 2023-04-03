import express from 'express';
import mongoose from 'mongoose';
import { Status } from '../classes/status';
import { MenuItemsNS } from '../types/item.type';

const itemValidation = (req: MenuItemsNS.IRequest, res: express.Response, next: express.NextFunction) => {
    if (!req.body.name || !req.body.category) {
        res.status(400).send(new Status(400, 'Name and Category are required'));
        return;
    }

    if (req.body.price === null || (typeof req.body.price) !== 'number') {
        res.status(400).send(new Status(400, 'Price must be a Number'));
        return;
    }
    next();
};

const itemIdValidation = (req: MenuItemsNS.IRequest, res: express.Response, next: express.NextFunction) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        res.status(400).send(new Status(400, 'Invalid ID'));
        return;
    }
    next();
};

export default { itemValidation, itemIdValidation };