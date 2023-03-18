import mongoose from "mongoose";
import Item from "../models/items";
import { MenuItem } from "../types/index";

const getItems = async (params: MenuItem.IQuery) => {
    const query: mongoose.FilterQuery<typeof Item> = {}
    if (params.maxPrice !== undefined)
        query.price = { $lte: params.maxPrice };
    if (params.category !== undefined)
        query.category = { $eq: params.category }
    if (params.searchTerms) {
        const qRegex = new RegExp(params.searchTerms, 'i');
        query.$or = [
            { name: qRegex },
            { category: qRegex },
            { description: qRegex }
        ]
    }
    return await Item.find(query); //it returns the items as array of js objects
}

const getSingleItem = async (id: string) => {
    return await Item.find({ _id: { $eq: id } });
}

const createItem = (item: MenuItem.IItem) => {
    const newItem = new Item({
        name: item.name,
        price: item.price,
        category: item.category,
        ingredients: item.ingredients,
        description: item.description,
        imageUrl: item.imageUrl
    })
    return newItem.save();
}

export { getItems, createItem, getSingleItem }