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
  const items = await Item.find(query);
  return items;
}

const creatItems = (req: MenuItem.ItemRequest) => {

  const newItem = new Item({
    name: req.body.name,
    category: req.body.category,
    ingredients: req.body.ingredients,
    description: req.body.description,
    price: req.body.price
  });

  newItem.save()
    .then(() => {
      return true;
    })

}

export default {
  getItems,
  creatItems
}