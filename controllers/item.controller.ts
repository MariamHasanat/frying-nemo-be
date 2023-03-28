import mongoose from "mongoose";
import { Item, User } from "../models/index";
import { MenuItem } from "../types/index";

const getItems = async (params: MenuItem.IItemQuery) => {
  const query: mongoose.FilterQuery<MenuItem.IItem> = {};

  if (params.maxPrice !== undefined) {
    query.price = { $lte: params.maxPrice };
  }
  const categories = JSON.parse(params.categories || "[]");
  console.debug(categories);
  if (categories.length) {
    query.category = { $in: categories };
  }

  if (params.searchTerms) {
    const qReg = new RegExp(params.searchTerms, "i");

    query.$or = [
      { name: qReg },
      { description: qReg },
      { category: qReg },
      { ingredients: qReg },
    ];
  }

  const items = await Item.find(query, null, {sort:{ '_id': -1}}).populate({
    path: "addedBy",
    select: ['fullName','email','imageUrl'],
  });

  return items;
};

const getItem = async (id: string) => {
  const item = await Item.findById(id).populate({
    path: "addedBy",
    select: ['fullName','email','imageUrl'],
  });
  return item;
};

const createItem = (req: MenuItem.IItemRequest) => {
  const newItem = new Item({
    name: req.body.name,
    category: req.body.category,
    ingredients: req.body.ingredients,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    addedBy: req.body.addedBy
  });

  newItem.price = req.body.price || 10;

  return newItem.save().then(async () => {
    await User.findByIdAndUpdate(req.body.addedBy, { $push: { items: newItem._id } })
    return true; // created successfully
  });
};

export default {
  getItems,
  getItem,
  createItem,
};
