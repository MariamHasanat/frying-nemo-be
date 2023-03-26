import mongoose from "mongoose";
import Item from "../models/items";
import { MenuItem } from "../types/index";

const getItems = async (params: MenuItem.IQuery) => {
    const query: mongoose.FilterQuery<typeof Item> = {}
    if (params.maxPrice !== undefined)
        query.price = { $lte: params.maxPrice };
    const categories : string[] = JSON.parse(params.categories || '[]') ;
    if (categories?.length) 
        query.category = { $in: categories }
    if (params.searchTerms) {
        const qRegex = new RegExp(params.searchTerms, 'i');
        query.$or = [
            { name: qRegex },
            { category: qRegex },
            { description: qRegex } ,
            { ingredients: qRegex } 
        ]
    }
    console.log(query);
    
    return await Item.find(query , null , {sort : {_id : -1}}); //it returns the items as array of js objects sorted descending by id
}

const getSingleItem = async (id: string) => {
    return await Item.find({ _id: { $eq: id } });
}

const createItem = (item: MenuItem.IItem) => {
    const newItem = new Item({
        name: item.name,
        price: item.price ?? 10,  // the value is falled back to 10 only if the price is null or undefined 
        category: item.category,
        ingredients: item.ingredients,
        description: item.description,
        imageUrl: item.imageUrl
    })
    return newItem.save();
}

export { getItems, createItem, getSingleItem }