import mongoose from "mongoose";
import Item from "../models/item.model"
import { IItemQuery } from "../types/index";

const getItems = async (qs: IItemQuery) => {
    const query: mongoose.FilterQuery<typeof Item > ={}; 
    if (qs.maxPrice !== undefined) {
        query.price = { $lte: qs.maxPrice }
    }
    if (qs.category) {
        query.category = { $eq: qs.category }
    }
    if (qs.page !== undefined) {
        query.page = { $eq: qs.page }
    }
    if (qs.searchTerms) {
        query.$or = [
            {
                name : new RegExp (qs.searchTerms,'i') 
            },
            {
                description : new RegExp (qs.searchTerms,'i')
            },{
                category: new RegExp (qs.searchTerms,'i')
            },

        ]
    }
    console.log(query);
    
    const items = await Item.find(query);
    return items;
}
const createItem = (data: any) => {

}
export default {
    getItems,
    createItem
};