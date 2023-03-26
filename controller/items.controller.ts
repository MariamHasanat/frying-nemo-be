import mongoose from "mongoose";
import Item from "../models/item.models.js"
import { MenuItem } from "../Type/index.js";

const getItems = async (params: MenuItem.ItemQuery) => {
  const query: mongoose.FilterQuery<MenuItem.Item> = {};

  if (params?.maxPrice !== undefined) {
    query.price = { $lte: params.maxPrice }
  }

  console.log(params.category);
  
  const category = JSON.parse(params.category || '[]');
  if (category.length) {
    query.category = { $in: category }
  }


  if (params?.searchTerms) {
    const qReg = new RegExp(params.searchTerms, 'i');

    query.$or = [
      { name: qReg },
      { category: qReg },
      { ingredients: qReg },
      { description: qReg }
    ]
  }
  const items = await Item.find(query , null , { sort: { '_id': -1 } });
  return items;
}
const getItemById = async (itemId: string) => {
  const itemDoc = await Item.findById(itemId);
  if (itemDoc) {
    const item: MenuItem.Item = {
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
const creatItems = (req: MenuItem.ItemRequest) => {

  const newItem = new Item({
    name: req.body.name,
    category: req.body.category,
    ingredients: req.body.ingredients,
    description: req.body.description,
    price: req.body.price
  });
  newItem.price = req.body.price ?? 10;
  newItem.save()
    .then(() => {
      return true;
    })

}

export default {
  getItems,
  getItemById,
  creatItems
}