export const validateItem = (req, res, next) => {
    if (!req.body.name || !req.body.category) {
        return res.status(400).send("Name and category are required!");
    }
    if (req.body.price && typeof req.body.price !== 'number') {
        return res.status(400).send("Price must be number!");
    }
    next();
};
