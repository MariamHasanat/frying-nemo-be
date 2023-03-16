import Item from "../models/items";
import { MenuItem } from "../types/index";

const getItems = async (params: MenuItem.IQuery) => {
    let query = {}

    if (params.maxPrice !== undefined)
        query = { ...query, price: { $lte: params.maxPrice } }
    if (params.category !== undefined)
        query = { ...query, category : {$eq: params.category} }
    if (params.maxPrice !== undefined)
        query = { ...query, price: { $lte: params.maxPrice } }
    if (params.searchTerms !== undefined)
        query = { ...query, name: (new RegExp(params.searchTerms , 'i')) }
    
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