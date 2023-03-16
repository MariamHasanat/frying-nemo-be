import Item from "../models/items.js"
import { IItem, IItemQuery } from "../dist/Types/index.js"
import mongoose from 'mongoose';
const getItems = async (param: IItemQuery) => {
    const query: mongoose.FilterQuery<IItem> = {}


    if (param.maxPrice !== undefined)
        query.price = { $lte: param.maxPrice }

    if (param.category)
        query.category = { $eq: param.category }

    if (param.searchTerms) {

        const qReg = new RegExp(param.searchTerms, "i")
        query.$or = [
            { name: qReg }, { description: qReg },{ category: qReg }
        ]
    }

    if (param.page)
        query.page = { $eq: param.page }




    const Items = await Item.find(query)
    return Items

}


const createItem = async (data: any) => {


}

export default {
    getItems,
    createItem
}
