import mongoose from "mongoose";
import Item from "../models/item.model"
import { MenuItem } from "../types/index";

const getItems = async (qs: MenuItem.IItemQuery) => {
    const query: mongoose.FilterQuery<typeof Item> = {};
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
                name: new RegExp(qs.searchTerms, 'i')
            },
            {
                description: new RegExp(qs.searchTerms, 'i')
            },
            {
                category: new RegExp(qs.searchTerms, 'i')
            },

        ]
    }
    console.log(query);

    const items = await Item.find(query);
    return items;
}
const createItem = (req: MenuItem.IItemRequest) => {

    const newItem = new Item({
        name: req.body.name,
        price: req.body.price,
        ingredients: req.body.ingredients,
        description: req.body.description,
        category: req.body.category
    });
    newItem.save()
        .then(() => { return true });
}
export default {
    getItems,
    createItem
};