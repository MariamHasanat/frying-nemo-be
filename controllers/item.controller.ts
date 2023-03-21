import mongoose from "mongoose";
import { Item } from "../models/index";
import { MenuItem } from "../types/index";

const getItems = async (query: MenuItem.IItemQuery) => {
    const q: mongoose.FilterQuery<MenuItem.IItem> = {} 

    if (query.maxPrice !== undefined) {
        q.price = { $lte: query.maxPrice }
    }

    if (query.categories) {
        q.category = { $eq: query.categories}
    }

    if (query.searchTerms) {
        const RegEx = new RegExp(query.searchTerms, 'i');
        q.$or = [
            { name: RegEx },
            { description: RegEx },
            { category: RegEx },
            { ingredients: RegEx }
        ]
    }

    const items = await Item.find(q);
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