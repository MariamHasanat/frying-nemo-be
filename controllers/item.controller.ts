import mongoose from "mongoose";
import { Item } from "../models/index";
import { IItem, IItemQuery } from "../types/index";

const getItems = async (query: IItemQuery) => {
    const q: mongoose.FilterQuery<IItem> = {} // next session: generic types of typescript
    
    if (query.maxPrice !== undefined) {
        q.price = { $lte: query.maxPrice }
    }

    if (query.category) {
        q.category = { $eq: query.category }
    }

    if (query.searchTerms) {
        const RegEx = new RegExp(query.searchTerms, 'i');
        q.$or = [
            { name: RegEx },
            { description: RegEx },
            { category: RegEx },
        ]

    }

    const items = await Item.find(q);
    return items;
}

const createItem = (body: IItem) => {
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