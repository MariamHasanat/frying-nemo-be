import { NextFunction, Response } from "express";
import { IItem } from "../../types/index.js";
import { isNumber } from "../../utils/general.util.js";

export const itemValidate = (req: IItem.Request, res: Response, next: NextFunction) => {
    const { name, price, category } = req.body;
    if (!name || !price || !category) {
        res.status(400).send("You must provide all required parameters (name, price, category), and price must be a valid number");
        return;
    }

    if (!isNumber(price)) {
        res.status(400).send("Price must be a valid number");
        return;
    }

    next();
}