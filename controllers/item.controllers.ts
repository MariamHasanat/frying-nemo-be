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

  const items = await Item.find(query, null, { sort: { '_id': -1 } })
  .populate(
    {
    path:'addedBy',
    select:'fullName'
  });

  //display *** in password
//   const parse = items.map(item =>({
//   ...item.toJSON(),
//   addedBy:{...item.addedBy?.toJSON() as any ,password:'******'}
// }))
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
      price: itemDoc.price || 0,
      addedBy: itemDoc.addedBy

    }

    return item;
  }
  return null;
}
const deleteItem = async (idItem: string) => {
  const itemDoc = await Item.findByIdAndRemove({ _id: idItem });
  if (itemDoc) {
    return itemDoc;
  }
  return null;
}
const updateItem = async (idItem: string, updatedItem: any) => {
  const itemDoc = await Item.findOneAndUpdate({ _id: idItem }, updatedItem, { new: true });
  if (itemDoc) {
    return itemDoc;
  }
  return null;
}

const createItem = (req: MenuItem.IItemRequest) => {
  const newItem = new Item({
    name: req.body.name,
    category: req.body.category,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
    ingredients: req.body.ingredients,
    description: req.body.description,
    addedBy: req.body.addedBy
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
  createItem,
  deleteItem,
  updateItem
}