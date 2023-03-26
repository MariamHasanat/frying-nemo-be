"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateItemId = exports.validateItem = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const validateItem = (req, res, next) => {
    if (!req.body.name || !req.body.category) {
        return res.status(400).send("Name and category are required!");
    }
    if (req.body.price && typeof req.body.price !== 'number') {
        return res.status(400).send("Price must be number!");
    }
    next();
};
exports.validateItem = validateItem;
const validateItemId = (req, res, next) => {
    if (!req.params.id) {
        return res.status(400).send("ID is required!");
    }
    if (!mongoose_1.default.isValidObjectId(req.params.id)) {
        return res.status(400).send("ID is Not Valid!");
    }
    next();
};
exports.validateItemId = validateItemId;
