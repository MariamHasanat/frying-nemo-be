import express from 'express'
import mongoose from 'mongoose';

const validateItem = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log(req.body);
    
    if (!req.body.name || !req.body.category) {
        return res.status(400).send("Name and category are required!");
    }
    if (req.body.price && typeof req.body.price !== 'number') {
        return res.status(400).send("Price Must be number!");
    }
    next();
}
const validateItemId = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).send("ID is required!");
    }
    next();
}

export { validateItem , validateItemId }