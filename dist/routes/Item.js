"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const item_validation_1 = require("../middleware/item-validation");
const item_control_1 = __importDefault(require("../controllers/item.control"));
const items_1 = __importDefault(require("../models/items"));
const routes = express_1.default.Router();
routes.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const items = yield item_control_1.default.getItems(req.query);
    res.status(200).send(items);
}));
routes.get('/:id', item_validation_1.validateItemId, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const item = yield item_control_1.default.getItemByID(req.params.id);
        res.status(200).send(item);
    }
    catch (error) {
        res.status(500).send();
    }
}));
routes.post('/', item_validation_1.validateItem, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield item_control_1.default.createItem(req);
        res.status(201).send();
    }
    catch (error) {
        next(error);
    }
}));
routes.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    items_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(item => {
        res.status(200).send();
        console.log(item);
    })
        .catch(err => {
        console.error(err);
    });
    routes.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("deletedItem");
        try {
            const deletedItem = yield items_1.default.findByIdAndDelete(req.params.id);
            if (!deletedItem) {
                return res.status(200).send();
            }
            res.status(200).send();
        }
        catch (err) {
            console.log(err);
            res.status(500).send();
        }
    }));
}));
exports.default = routes;
