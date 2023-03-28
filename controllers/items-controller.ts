import mongoose from "mongoose";
import { IMenuItem } from "../interfaces/menuItems-interface";
import Item from "../models/item-schema"

const getItems = async (params: IMenuItem.IItemQuery) => {

    let query: mongoose.FilterQuery<typeof Item> = {};

    if (params.maxPrice !== undefined) {
        query = { ...query, price: { $lte: params.maxPrice } }
    }

    const category = JSON.parse(params.category || '[]')

    if (category.length) {
        // query.category = { $eq: params.category } , this method will add an object names category to the query object -nested objects- , and add a value to this object
        query = { ...query, category: { $in: category } } // while this method says that, spread the values of query as it,and assign a new value to the category object which already exist in the object query 
    }
    if (params.searchTerms) {
        const queryRegex = new RegExp(params.searchTerms, 'i');

        // will receive an array
        query.$or = [
            {
                name: queryRegex
            },
            {
                description: queryRegex
            },
            {
                category: queryRegex
            },
            {
                ingredients: queryRegex
            }
        ]
    }

    return await Item.find(query, null, { sort: { '_id': -1 } });
}

const getItem = async (itemId: string) => {
    const itemDoc = await Item.findById(itemId);
    if (itemDoc) {
      const item: IMenuItem.IItem = {
        name: itemDoc.name,
        category: itemDoc.category,
        description: itemDoc.description || '',
        imageUrl: itemDoc.imageUrl || '',
        ingredients: itemDoc.ingredients,
        price: itemDoc.price || 0
      }
  
      return item;
    }
    return null;
  }

const createItems = (item: IMenuItem.IItem) => {
    const newItem = new Item({
        name: item.name,
        price: item.price,
        description: item.description,
        category: item.category,
        ingredients: item.ingredients,
        imageUrl: item.imageUrl
    })

    newItem.price = item.price ?? 10;
    return newItem.save()
        .then(
            () => {
                return true
            }
        )

}

export default { getItems, createItems, getItem };