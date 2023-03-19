import { IItemRequest } from "../Type/index";
import express from 'express';

const validate = (req : IItemRequest, res : express.Response, next : express.NextFunction) => {
    if (!req.body.name || !req.body.category) {
        return res.status(400).send("Name and category are required!");
      }
      if (req.body.price && typeof req.body.price !== 'number') {
        return res.status(400).send("Price Must be number!");
      }
      next();
}

export default validate;