import { Item } from "../models/index";
import { IItem, IItemQuery } from "../types/index";

const getItems = async (query: IItemQuery) => {
    const items = await Item.find({
        price: {
            $lte: query.maxPrice
        }
    });
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