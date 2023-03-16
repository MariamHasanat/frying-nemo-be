import Item from "../models/item.js";
import { IItemQuery } from "../type/index.js";


const getItems = async (params: IItemQuery) => {
  const items = await Item.find();
  return items;
}



const createItem = (data: any) => {
}

export default {
  getItems,
  createItem
}