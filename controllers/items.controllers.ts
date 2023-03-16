import mongoose from "mongoose";
import Item from "../models/item.moudel";
import { IIQuery, IItem } from "../types/index";

const getItems = async (params: IIQuery) => {
    const query: mongoose.FilterQuery<IItem> = {}

    if (params.maxPrice !== undefined) {
        query.price = { $lte: params.maxPrice }
    }
    if (params.category) {
        query.category = { $eq: params.category }
    }
    if (params.searchTerms) {

        const qReg = new RegExp(params.searchTerms, 'i')
        query.$or = [
            {
                name: qReg
            }, {
                description: qReg
            },
            {
                category: qReg
            }
        ]

    }


    const items = await Item.find(query);

    return items;
}

const createItems = (data: any) => {

    return
}

export default {
    getItems,
    createItems
}