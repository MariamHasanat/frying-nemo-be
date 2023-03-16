import mongoose from "mongoose";
import Item from "../models/items.moddel.js";
import { ItemQuery } from "../types/index.js";


const getItem = async (params: ItemQuery) => {
    const query: mongoose.FilterQuery<typeof Item> = {};

    if (params.maxPrice !== undefined) {
        query.price = { $lte: params.maxPrice }  //params.maxPrice less than  or equal 
    }

    if (params.searchTerms) {
        const qReg = new RegExp(params.searchTerms, 'i')//i for case insinsetive , regex : make easer to put condition  


        query.$or = [
            { name: qReg },
            { description: qReg },
            { category: qReg }
        ]
    }
    if (params.category) {
        query.category = { $eq: params.category }
    }
    console.log(JSON.stringify(query));


    const items = await Item.find(query);//return all items as a json if just () else no return specific 
    return (items);
}

const creatItem = (data: any) => {


}
export default {
    getItem,
    creatItem
}