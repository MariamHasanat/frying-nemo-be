import Item from '../models/items';
import mongoose from 'mongoose';
import { MenuItem } from "../types/index";
const getItems = async (param: MenuItem.IItemQuery) => {
    const query: mongoose.FilterQuery<MenuItem.ItemRequest> = {}


    if (param.maxPrice !== undefined)
        query.price = { $lte: param.maxPrice }

    const categories = JSON.parse(param.category || "[]")
    if (categories.length)
        query.category = { $in: categories }

    if (param.searchTerms) {
        const qReg = new RegExp(param.searchTerms, "i")
        query.$or = [
            { name: qReg }, { description: qReg }, { category: qReg }, { ingredients: qReg }
        ]
    }

    const Items = await Item.find(query, null, { sort: { "price": 1 } })
    return Items

}
const getItemByID = (idItem: string) => {
    const itemDoc = Item.findById(idItem)
    if (itemDoc) {
        return itemDoc
    }
    return null;
}

const createItem = (data: MenuItem.ItemRequest) => {

    const NewItem = new Item({
        name: data.body.name,
        category: data.body.category || "",
        ingredients: data.body.ingredients,
        description: data.body.description,
        imageUrl: data.body.imageUrl,
        price: data.body.price ?? 10
    })

    return NewItem.save()
}



export default {
    getItems,
    createItem,
    getItemByID
}
