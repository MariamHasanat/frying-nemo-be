import { Response } from "express";
import { FilterQuery } from "mongoose";
import { ItemModel } from "../models";
import User from "../models/user";
import { MenuItem } from "../types/item";

const getItems = async (query: MenuItem.IQuery) => {
    const maxPrice: number = query.maxPrice;
    const category = query.category;
    const searchTerms = query.searchTerms;

    const filteredQuery: FilterQuery<MenuItem.IItem> = {};

    if (maxPrice !== undefined) {
        filteredQuery.price = { $lte: maxPrice }
    }
    if (category) {
        filteredQuery.category = { $eq: category }
    }

    if (searchTerms) {
        const qReg = new RegExp(searchTerms, 'i');

        filteredQuery.$or = [
            { name: qReg },
            { category: qReg },
            { description: qReg },
            { ingredients: qReg }
        ];

    }

    const result = await ItemModel.find(filteredQuery, null, { sort: { "_id": -1 } })
        .populate({
            path: 'addedBy',
            select: ['fullName']
        });
    console.log({ result });
    return result;
}

const createItem = (req: MenuItem.IItemRequest, res: Response) => {

    const item = new ItemModel({
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        price: req.body.price,
        imageUrl: req.body.imageUrl,
        ingredients: req.body.ingredients,
        addedBy: req.body.addedBy,
    });

    item.save()
        .then(async () => {
            await User.findByIdAndUpdate(req.body.addedBy, { $push: { items: item._id } });
        });
}

const updateItem = () => {

}

export default {
    getItems,
    createItem
}