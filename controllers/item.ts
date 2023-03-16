import Item from "../models/item.js";
import { IItemQuery } from "../type/index.js";


const getItems = async (params: IItemQuery) => {
  const query: any = {};

  if (params.maxPrice !== undefined){
    query.price = {$lte: params.maxPrice}
  }

  if (params.category){
    query.category = {$lte: params.category}
  }

  if (params.searchItem){
   const qReg = new RegExp(params.searchItem, 'i');

   query.$or = [
    {name: qReg},
    {description: qReg},
    { category: qReg },
   ]
  }

  const items = await Item.find(query)
  return items;
}



const createItem = (data: any) => {
}

export default {
  getItems,
  createItem
}