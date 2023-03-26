import mongoose from "mongoose";
import Item from "../models/item.model";
import { MenuItem } from '../types/index';

const getItems = async (params: MenuItem.IItemQuery) => {
  const query: mongoose.FilterQuery<MenuItem.IItem> = {};

  if (params.maxPrice !== undefined) {
    query.price = { $lte: params.maxPrice }
  }

  const categories = JSON.parse(params.categories || '[]');
  if (categories.length) {
    query.category = { $in: categories }
  }

  if (params.searchTerms) {
    const qReg = new RegExp(params.searchTerms, 'i');

    query.$or = [
      { name: qReg },
      { description: qReg },
      { category: qReg },
      { ingredients: qReg }
    ]
  }

  const items = await Item.find(query, null, { sort: { '_id': -1 } });

  return items;
};

const getItem = async (itemId: string) => {
  const itemDoc = await Item.findById(itemId);
  if (itemDoc) {
    const item: MenuItem.IItem = {
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

const createItem = (req: MenuItem.IItemRequest) => {
  const newItem = new Item ({
    name: req.body.name,
    category: req.body.category,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
    ingredients: req.body.ingredients,
    description: req.body.description
  });

  newItem.price = req.body.price ?? 10;

  return newItem.save()
    .then(() => {
      return true;       
    });
}

export default {
  getItems,
  getItem,
  createItem
}