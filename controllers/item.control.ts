import Item from "../models/items.js"
import { IItem, IItemQuery } from "../dist/Types/index.js"
import mongoose from 'mongoose';
import { Response } from "express";
const getItems = async (param: IItemQuery) => {
    const query: mongoose.FilterQuery<IItem> = {}


    if (param.maxPrice !== undefined)
        query.price = { $lte: param.maxPrice }

    if (param.category)
        query.category = { $eq: param.category }

    if (param.searchTerms) {

        const qReg = new RegExp(param.searchTerms, "i")
        query.$or = [
            { name: qReg }, { description: qReg }, { category: qReg }
        ]
    }

    if (param.page)
        query.page = { $eq: param.page }




    const Items = await Item.find(query)
    return Items

}


const createItem = async (data: IItem, res: Response) => {

    if (!data.name || !data.category)
        return res.status(400).send("Name or Category not found and there are required")

    if (data.price && typeof data.price !== "number")
        return res.status(400).send("Price must be a number")


    const NewItem = {
        name: data.name,
        category: data.category || "",
        ingredients: data.ingredients,
        description: data.description,
        price: data.price || 0
    }

    return NewItem
}


export default {
    getItems,
    createItem
}
