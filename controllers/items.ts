import mongoose from "mongoose";
import Item from "../models/items";
import { MenuItem } from "../types/index";

const getItems = async (params: MenuItem.IQuery) => {
    let query: mongoose.FilterQuery<typeof Item> = {}
    if (params.maxPrice !== undefined)
        query = { ...query, price: { $lte: params.maxPrice } }
    if (params.category !== undefined)
        query = { ...query, category: { $eq: params.category } }
    if (params.searchTerms !== undefined) {
        const qRegex = new RegExp(params.searchTerms, 'i');
        query = { ...query, name: qRegex }
        query.$or = [
            { name: qRegex },
            { category: qRegex },
            { description: qRegex }
        ]
    }
    return await Item.find(query); //it returns the items as array of js objects
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

export { getItems, createItem }