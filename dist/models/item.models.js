"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ItemSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    imageUrl: String,
    description: String,
    price: {
        type: 'Number'
    },
    category: {
        type: String,
        required: true
    },
    ingredients: {
        type: [String],
        default: []
    }
});
const Item = mongoose_1.default.model("Item", ItemSchema);
exports.default = Item;
