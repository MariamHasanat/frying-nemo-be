import mongoose from "mongoose";
import Item from "../models/item.models.js"
import { IItem, IItemQuery } from "../Type/index.js";

const getItems = async (params?: IItemQuery) => {
    const query : mongoose.FilterQuery<IItem> = {};

    if(params?.maxPrice !== undefined) {
        query.price = {$lte : params.maxPrice}
    }

    if(params?.category) {
        query.category = {$eq : params.category};
    }

    if(params?.searchTerms) {
        const qReg = new RegExp(params.searchTerms, 'i');   

        query.$or = [
            { name : qReg } ,
            { category : qReg } ,
            { description : qReg}
        ]
    }

    // console.log(query);
    

    const items = await Item.find(query);
    return items;
}

export default {getItems}