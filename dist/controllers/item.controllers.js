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
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../models/index");
const getItems = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const query = {};
    if (params.maxPrice !== undefined) {
        query.price = { $lte: params.maxPrice };
    }
    const categories = JSON.parse(params.categories || '[]');
    if (categories.length) {
        query.category = { $in: categories };
    }
    if (params.searchTerms) {
        const qReg = new RegExp(params.searchTerms, 'i');
        query.$or = [
            { name: qReg },
            { description: qReg },
            { category: qReg },
            { ingredients: qReg }
        ];
    }
    const items = yield index_1.Item.find(query, null, { sort: { '_id': -1 } });
    return items;
});
const getItemById = (itemId) => __awaiter(void 0, void 0, void 0, function* () {
    const itemDoc = yield index_1.Item.findById(itemId);
    if (itemDoc) {
        const item = {
            name: itemDoc.name,
            category: itemDoc.category,
            description: itemDoc.description || '',
            imageUrl: itemDoc.imageUrl || '',
            ingredients: itemDoc.ingredients,
            price: itemDoc.price || 0
        };
        return item;
    }
    return null;
});
const createItem = (req) => {
    var _a;
    const newItem = new index_1.Item({
        name: req.body.name,
        category: req.body.category,
        imageUrl: req.body.imageUrl,
        price: req.body.price,
        ingredients: req.body.ingredients,
        description: req.body.description
    });
    // if (req.body.price === null || req.body.price === undefined) {
    //   newItem.price = 10;
    // }
    newItem.price = (_a = req.body.price) !== null && _a !== void 0 ? _a : 10;
    return newItem.save()
        .then(() => {
        return true; // created successfully      
    });
};
exports.default = {
    getItems,
    getItemById,
    createItem
};
