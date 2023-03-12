var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
import Item from "../models/items.js";
const routes = express.Router();
routes.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const items = yield Item.find();
    res.status(200).send(items);
}));
routes.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    if (!body.name || !body.category)
        return res.status(400).send("Name or Category not found and there are required");
    if (body.price && typeof body.price !== "number")
        return res.status(400).send("Price must be a number");
    const NewItem = new Item({
        name: req.body.name,
        category: req.body.category,
        ingredients: body.ingredients,
        description: body.description,
        price: body.price
    }).save()
        .then(() => {
        res.status(201).send("Item created successful");
    }).catch(() => {
        res.status(400).send("Failed to create Item");
    });
}));
export default routes;
