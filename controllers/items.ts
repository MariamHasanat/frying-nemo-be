import mongoose from "mongoose";
import Item from "../models/items";
import { MenuItem } from "../types/index";
import User from "../models/user";

const getItems = async (params: MenuItem.IQuery) => {
    const query: mongoose.FilterQuery<typeof Item> = {}
    if (params.maxPrice !== undefined)
        query.price = { $lte: params.maxPrice };
    const categories: string[] = JSON.parse(params.categories || '[]');
    if (categories?.length)
        query.category = { $in: categories }
    if (params.searchTerms) {
        const qRegex = new RegExp(params.searchTerms, 'i');
        query.$or = [
            { name: qRegex },
            { category: qRegex },
            { description: qRegex },
            { ingredients: qRegex }
        ]
    }
    console.log(query);

    return await Item.find(query, null, { sort: { _id: -1 } })
        .populate({
            path: 'addedBy',
            select: ['fullName', 'email' , 'imageUrl']
        });
    //it returns the items as array of js objects sorted descending by id
}

const getSingleItem = async (id: string) => {
    return await Item.findById(id)
        .populate({
            path: 'addedBy',
            select: ['email' , 'fullName' , 'imageUrl']
        });
}

const createItem = (item: MenuItem.IItem) => {
    const newItem = new Item({
        name: item.name,
        price: item.price ?? 10,  // the value is falled back to 10 only if the price is null or undefined 
        category: item.category,
        ingredients: item.ingredients,
        description: item.description,
        imageUrl: item.imageUrl,
        addedBy: item.addedBy
    })
    return newItem.save()
        .then(async () => {
            await User.findByIdAndUpdate(item.addedBy, { $push: { items: item.addedBy } })
        });
}

const deleteItem = (id: string) => {
    return Item.deleteOne({ _id: { $eq: id } })
}
const updateItem = async (id: string, newItem: MenuItem.IItem) => {
    return Item.updateOne({ _id: { $eq: id } }, newItem)
}

export { getItems, createItem, getSingleItem, deleteItem, updateItem }