import { Response } from "express";
import { FilterQuery } from "mongoose";
import Item from "../models/item";
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

    console.log(filteredQuery);

    const result: MenuItem.IItem[] = await Item.find(filteredQuery);
    return result;
}

const createItem = (req: MenuItem.IItemRequest, res: Response) => {

    const item = new Item({
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        price: req.body.price,
        imageUrl: req.body.imageUrl,
        ingredients: req.body.ingredients,
    });

    item.validate()
        .then(() => {
            item.save();
            res.status(200).send('Item added successfully');
        })
        .catch((err) => {
            res.status(500).send(err.message);
            console.log(err.message);
        });
}

const updateItem = () => {

}

export default {
    getItems,
    createItem
}