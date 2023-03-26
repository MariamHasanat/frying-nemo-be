import express from 'express'
import mongoose from 'mongoose';
const validateItem = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (req.headers['content-type'] !== 'application/json') {
        res.status(400).send('Expecting JSON data');
        return;
    }
    const body = req.body;
    if (!body.name || !body.price || !body.category) {
        res.status(400).send('name, price and category are required!');
        return;
    }
    // TODO: manually check the rest of the types of body values (typeof ...)
    if (typeof body.price !== 'number') {
        res.status(400).send('price must be of type Number');
        return;
    }
    next();
}

const validateItemId = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const id = req.params.id;

    if (!mongoose.isValidObjectId(id)) {
        res.status(400).send('invalid id');
        return;
    }
    next();
}

export default { validateItem, validateItemId }