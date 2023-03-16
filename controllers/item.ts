import { Item } from "../models/index";
import { IItemQuery } from "../types/index";
const getItems = async (qs: IItemQuery) =>{
    const items = await Item.find();
    
    
    return items;
};


export default {
    getItems
}