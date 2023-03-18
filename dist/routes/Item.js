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
import itemControl from "../controllers/item.control.js";
const routes = express.Router();
routes.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const items = yield itemControl.getItems(req.query);
    res.status(200).send(items);
}));
routes.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const items = yield itemControl.createItem(req.body, res);
    const newItems = new Item(items);
    newItems.save()
        .then(() => {
        res.status(201).send("Item created successful");
    }).catch(() => {
        res.status(400).send("Failed to create Item");
    });
}));
export default routes;
