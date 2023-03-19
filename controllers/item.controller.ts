import mongoose from "mongoose";
import { Item } from "../models/index";
import { IItemQuery, IItem, IItemRequest } from "../types/index"

const getItems = async (params: IItemQuery) => {

    const query: mongoose.FilterQuery<IItem> = {};

    if (params.maxPrice !== undefined) {
        query.price = { $lte: params.maxPrice };
    }

    if (params.category) {
        query.category = { $eq: params.category };
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

const createItem = (req: IItemRequest) => {
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