import express from 'express';
import { Status } from '../classes/status';
import { MenuItems } from '../types/item.type';

const itemValidation = (req: MenuItems.IRequest, res: express.Response, next: express.NextFunction) => {
    if (!req.body.name || !req.body.category) {
        res.status(400).send(new Status(400, 'Name and Category are required'));
        return;
    }
    if (!req.body.price || (typeof req.body.price) !== 'number') {
        res.status(400).send(new Status(400, 'Price must be a Number'));
        return;
    }
    next();
};

export default itemValidation;