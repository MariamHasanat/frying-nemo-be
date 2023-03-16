import { Item } from "../models/index";
import { IItem } from "../types/index";

const getItems = async () => {
    const items = await Item.find();
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