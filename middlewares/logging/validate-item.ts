import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import { IMenuItem } from '../../interfaces/menuItems-interface';

const validateItem = (req: IMenuItem.IItemRequest, res: Response, next: express.NextFunction) => {

  if (!req.body.name || !req.body.category) {
    return res.status(401).send("name and category are required !").end();
  }

  if (req.body.price && typeof req.body.price !== 'number') {
    return res.status(401).send("price should be number !").end();
  }

  next();

}
const validateItemId = (req: IMenuItem.IItemRequest, res: express.Response, next: express.NextFunction) => {
  if (!req.params.id) {
    return res.status(400).send("ID is required!");
  }

  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send("ID is Not Valid!");
  }
  next();
}

export { validateItem,validateItemId };