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
const items_1 = __importDefault(require("../models/items"));
const getItems = (param) => __awaiter(void 0, void 0, void 0, function* () {
    const query = {};
    if (param.maxPrice !== undefined)
        query.price = { $lte: param.maxPrice };
    const categories = JSON.parse(param.category || "[]");
    if (categories.length)
        query.category = { $in: categories };
    if (param.searchTerms) {
        const qReg = new RegExp(param.searchTerms, "i");
        query.$or = [
            { name: qReg }, { description: qReg }, { category: qReg }, { ingredients: qReg }
        ];
    }
    const Items = yield items_1.default.find(query, null, { sort: { "price": 1 } });
    return Items;
});
const getItemByID = (idItem) => {
    const itemDoc = items_1.default.findById(idItem);
    if (itemDoc) {
        return itemDoc;
    }
    return null;
};
const createItem = (data) => {
    var _a;
    const NewItem = new items_1.default({
        name: data.body.name,
        category: data.body.category || "",
        ingredients: data.body.ingredients,
        description: data.body.description,
        imageUrl: data.body.imageUrl,
        price: (_a = data.body.price) !== null && _a !== void 0 ? _a : 10
    });
    return NewItem.save();
};
exports.default = {
    getItems,
    createItem,
    getItemByID
};
