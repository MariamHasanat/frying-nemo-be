var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Item } from "../models/index.js";
const getItems = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const query = {};
    if (params.maxPrice !== undefined) {
        query.price = { $lte: params.maxPrice };
    }
    if (params.category) {
        query.category = { $eq: params.category };
    }
    if (params.searchTerms) {
        const qReg = new RegExp(params.searchTerms, 'i');
        query.$or = [
            { name: qReg },
            { description: qReg },
            { category: qReg },
            { ingredients: qReg },
        ];
    }
    console.log(query);
    const items = yield Item.find(query, null, { sort: { '_id': -1 } });
    return items;
});
const getItemById = (itemId) => __awaiter(void 0, void 0, void 0, function* () {
    const itemDoc = yield Item.findById(itemId);
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
    const newItem = new Item({
        name: req.body.name,
        category: req.body.category,
        ingrediants: req.body.ingredients,
        description: req.body.description,
    });
    newItem.price = (_a = req.body.price) !== null && _a !== void 0 ? _a : 10; //coelacing
    return newItem.save()
        .then(() => {
        return true;
    });
};
export default {
    getItems,
    createItem,
    getItemById
};
