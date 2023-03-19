import mongoose from "mongoose";
import { Item } from "../models/index.js";
import { IItem, IItemQuery } from '../type/index.js';


const getItems = async (params: IItemQuery) => {
  const query: mongoose.FilterQuery<IItem> = {};

  if (params.maxPrice !== undefined) {
    query.price = { $lte: params.maxPrice }
  }

  if (params.category) {
    query.category = { $eq: params.category }
  }

  if (params.searchTerms) {
    const qReg = new RegExp(params.searchTerms, 'i');

    query.$or = [
      { name: qReg },
      { description: qReg },
      { category: qReg },
      // {
      //   price: {
      //     $eq: 15
      //   }
      // }
    ]
  }

  console.log(query);

  const items = await Item.find(query);

  return items;
}

const createItem = (data: any) => {

}

export default {
  getItems,
  createItem
}