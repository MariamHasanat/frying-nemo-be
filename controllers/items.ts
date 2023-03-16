import Item from "../models/items";
import { MenuItem } from "../types/index";

const getItems = async(params:MenuItem.IQuery) => {
    return await Item.find(); //it returns the items as array of js objects
}

const createItem = (item: MenuItem.IItem) => {
    const newItem = new Item({
        name : item.name , 
        price: item.price , 
        category: item.category ,
        ingredients: item.ingredients,
        description : item.description ,
        imageUrl : item.imageUrl
    })
    return newItem.save();
}

export {getItems , createItem}