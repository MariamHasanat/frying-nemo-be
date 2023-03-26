import mongoose from "mongoose";
import Item from "../models/model";
import { MenuItems } from "../types/index";

const getItems = async (params: MenuItems.IQuery) => {
    const query: mongoose.FilterQuery<MenuItems.Item> = {}

    if (params.maxPrice !== undefined) {
        query.price = { $lte: params.maxPrice }
    }
    const categories = JSON.parse(params.category || '[]');
    if (categories.length) {
        query.category = { $in: categories }
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


    const items = await Item.find(query, null, { sort: { '_id': -1 } });

    return items;
}

const createItems = (req: MenuItems.ItemRequest) => {
    const newItem = new Item({
        name: req.body.name,
        category: req.body.category,
        ingredients: req.body.ingredients,
        description: req.body.description,
        price: req.body.price,
        imageUrl: req.body.imageUrl
    });
    newItem.price = req.body.price || 10
    return newItem.save()
        .then(() => {
            return true ///successfully created
        }

        )
}
const getItemById = async (itemId: string) => {
    const itemDoc = await Item.findById(itemId);
    if (itemDoc) {
        const item: MenuItems.Item = {
            name: itemDoc.name,
            category: itemDoc.category,
            imageUrl: itemDoc.imageUrl || '',
            description: itemDoc.description || '',
            ingredients: itemDoc.ingredients,
            price: itemDoc.price || 0
        }

        return item;
    }
    return null;

}

export default {
    getItems,
    createItems,
    getItemById
}