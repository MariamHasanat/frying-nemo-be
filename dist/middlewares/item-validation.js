export const validation = (req, res, next) => {
    if (!req.name || !req.category)
        return res.status(400).send("Name or Category not found and there are required");
    if (req.price && typeof req.price !== "number")
        return res.status(400).send("Price must be a number");
    next();
};
