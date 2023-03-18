var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Item from "../models/items.js";
const getItems = (param) => __awaiter(void 0, void 0, void 0, function* () {
    const query = {};
    if (param.maxPrice !== undefined)
        query.price = { $lte: param.maxPrice };
    if (param.category)
        query.category = { $eq: param.category };
    if (param.searchTerms) {
        const qReg = new RegExp(param.searchTerms, "i");
        query.$or = [
            { name: qReg }, { description: qReg }, { category: qReg }
        ];
    }
    if (param.page)
        query.page = { $eq: param.page };
    const Items = yield Item.find(query);
    return Items;
});
const createItem = (data, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!data.name || !data.category)
        return res.status(400).send("Name or Category not found and there are required");
    if (data.price && typeof data.price !== "number")
        return res.status(400).send("Price must be a number");
    const NewItem = {
        name: data.name,
        category: data.category || "",
        ingredients: data.ingredients,
        description: data.description,
        price: data.price || 0
    };
    return NewItem;
});
export default {
    getItems,
    createItem
};
