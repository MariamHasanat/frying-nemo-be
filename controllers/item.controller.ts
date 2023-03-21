import mongoose from "mongoose";
import { Item } from "../models/index";
import { MenuItem } from "../types/index"

const getItems = async (params: MenuItem.ItemQuery) => {

    const query: mongoose.FilterQuery<MenuItem.Item> = {};

    if (params.maxPrice !== undefined) {
        query.price = { $lte: params.maxPrice };
    }

    if (params.categories) {
        query.category = { $in: params.categories };
    }

    if (params.searchTerms) {
        const qReq = new RegExp(params.searchTerms, 'i');

        query.$or = [
            { name: qReq },
            { description: qReq },
            { category: qReq },
            { ingredients: qReq }
            // {
            //     price: {
            //         $eq: 15
            //     }
            // }
        ];
    }

    console.log(query);

    const items = await Item.find(query);

    return items;
}

const createItem = (req: MenuItem.ItemRequest) => {
    const newItem = new Item({
        name: req.body.name,
        category: req.body.category,
        ingredients: req.body.ingredients,
        description: req.body.description,
        price: req.body.price || 10
    });

    return newItem.save()
        .then(() => {
            return true;
        });
}
export default {
    getItems,
    createItem
}