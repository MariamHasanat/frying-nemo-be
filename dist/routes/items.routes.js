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
const item_models_1 = __importDefault(require("../models/item.models"));
const item_controlles_1 = __importDefault(require("../controllers/item.controlles"));
const router = express_1.default.Router();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const items = yield item_controlles_1.default.getItems(req.query);
    res.status(200).send(items);
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.name || !req.body.category) {
        return res.status(400).send("Name and category are required!");
    }
    if (req.body.price && typeof req.body.price !== 'number') {
        return res.status(400).send("Price Must be number!");
    }
    const newItem = new item_models_1.default({
        name: req.body.name,
        category: req.body.category,
        ingredients: req.body.ingredients,
        description: req.body.description
    });
    newItem.price = req.body.price || 10;
    newItem.save()
        .then(() => {
        res.status(201).send("created");
    })
        .catch((err) => {
        console.error(err.message);
        res.status(500).send("Failed to add item!");
    });
}));
exports.default = router;
