import mongoose from "mongoose";
import Item from "../models/item.js";
import { IItem } from "../types/index.js";

const getItems = async (params: IItem.Query) => {
    const { category, searchTerm, page, maxPrice, ingredients } = params;

    const query: mongoose.FilterQuery<IItem.Item> = {};

    if (category) {
        query.category = {
            $in: category?.split(",")
        }
    }

    if (searchTerm) {
        const searchReg = new RegExp(searchTerm, `i`);
        query.$or = [{ name: searchReg }, { description: searchReg }, { ingredients: searchReg }]
    }

    if (maxPrice) {
        query.price = {
            $lte: maxPrice
        }
    }

    if (ingredients) {
        const ingredientsArr = JSON.parse(ingredients);
        console.log(`ing: `, ingredientsArr)
        query.ingredients = {
            $in: ingredientsArr
        }
    }

    return await Item.find(query);
}

const getItem = async (id: string) => {
    return (await Item.find({ _id: id }))[0];
}

const addItem = async (item: IItem.Item) => {
    const newItem = new Item(item);
    await newItem.save()
}

const deleteItem = async (filter: IItem.Query) => {
    return await Item.findOneAndDelete(filter);
}

export default { getItems, getItem, addItem, deleteItem }