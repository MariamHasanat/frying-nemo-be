import Item from "../models/items";
import { IItem } from "../types/index";

const getItems = async() => {
    return await Item.find(); //it returns the items as array of js objects
}

const createItem = (item: IItem) => {
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