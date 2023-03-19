import mongoose from "mongoose";
import Item from "../models/model";
import {  MenuItems } from "../types/index";

const getItems = async (params: MenuItems.IQuery) => {
    const query: mongoose.FilterQuery<MenuItems.Item> = {}

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
            },
            {
                ingredients: qReg
            }
        ]

    }


    const items = await Item.find(query);

    return items;
}

const createItems = (req: MenuItems.ItemRequest) => {
    const newItem = new Item({
        name: req.body.name,
        category: req.body.category,
        ingredients: req.body.ingredients,
        description: req.body.description,
        price: req.body.price
    });
    newItem.price = req.body.price || 10
    return newItem.save()
        .then(() => {
            return true ///successfully created
        }

        )
}

export default {
    getItems,
    createItems
}