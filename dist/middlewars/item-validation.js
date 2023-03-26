import mongoose from "mongoose";
export const validateItem = (req, res, next) => {
    if (!req.body.name || !req.body.category) {
        return res.status(400).send("Name and category are required!");
    }
    if (req.body.price && typeof req.body.price !== 'number') {
        return res.status(400).send("Price must be number!");
    }
    next();
};
export const validateItemId = (req, res, next) => {
    if (!req.params.id) {
        return res.status(400).send("ID is required!");
    }
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).send("ID is Not Valid!");
    }
    next();
};
