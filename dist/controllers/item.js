var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Item from "../models/item.js";
const getItems = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const query = {};
    if (params.maxPrice !== undefined) {
        query.price = { $lte: params.maxPrice };
    }
    if (params.category) {
        query.category = { $lte: params.category };
    }
    if (params.searchItem) {
        const qReg = new RegExp(params.searchItem, 'i');
        query.$or = [
            { name: qReg },
            { description: qReg },
            { category: qReg },
        ];
    }
    const items = yield Item.find(query);
    return items;
});
const createItem = (data) => {
};
export default {
    getItems,
    createItem
};
