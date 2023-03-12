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
import Item from "../models/item.js";
const router = express.Router();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const items = yield Item.find();
    res.send(items);
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.name || !req.body.category) {
        return res.status(400).send("name and category are required!");
    }
    if (!req.body.price && typeof req.body) {
        return res.status(400).send("name and category are required!");
    }
    const newItem = new Item({
        name: req.body.name,
        category: req.body.category,
        ingredients: req.body.ingredients,
        description: req.body.description,
        price: req.body.price,
    });
    newItem.save()
        .then(() => {
        res.status(201).send();
    })
        .catch((err) => {
        console.error(err.message);
        res.status(500);
    });
}));
