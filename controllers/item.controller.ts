import mongoose from "mongoose";
import { Item } from "../models/index";
import { MenuItem } from "../types/index";

const getItems = async (params: MenuItem.IItemQuery) => {
    const query: mongoose.FilterQuery<MenuItem.IItem> = {}

    if (params.maxPrice !== undefined) {
        query.price = { $lte: params.maxPrice }
    }

    const categories = JSON.parse(params.categories || '[]');
    if (categories.length) {
        query.category = { $in: categories }
    }

    if (params.searchTerms) {
        const RegEx = new RegExp(params.searchTerms, 'i');
        query.$or = [
            { name: RegEx },
            { description: RegEx },
            { category: RegEx },
            { ingredients: RegEx }
        ]
    }

    const items = await Item.find(query);
    return items;
}

const createItem = (body: MenuItem.IItem) => {
    const newItem = new Item({
        name: body.name,
        category: body.category,
        price: body.price,
        ingredients: body.ingredients,
        description: body.description,
        imageURL: body.imageURL
    })

    return newItem.save() // returning a promise
}

export default {
    getItems,
    createItem
}