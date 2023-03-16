import { FilterQuery } from "mongoose";
import Item from "../models/item";
import { MenuItem } from "../types/item";

const getItems = async (query: MenuItem.IQuery) => {
    const maxPrice: number = query.maxPrice;
    const category = query.category;
    const searchTerms = query.searchTerms;

    const filteredQuery: FilterQuery<MenuItem.IItem> = {};

    if (maxPrice !== undefined) {
        filteredQuery.price = { $lte: maxPrice }
    }
    
    if (category) {
        filteredQuery.category = { $eq: category }
    }

    if (searchTerms) {
        const qReg = new RegExp(searchTerms, 'i');

        filteredQuery.$or = [
            { name: qReg },
            { category: qReg },
            { description: qReg },
        ];

    }

    console.log(filteredQuery);

    const result: MenuItem.IItem[] = await Item.find(filteredQuery);
    return result;
}

export default {
    getItems
}