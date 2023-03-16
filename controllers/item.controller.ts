import { Item } from "../models/index";
import { IItemQuery } from "../types/index";
const getItems = async (params: IItemQuery) => {
    const query: any = {};
    if(params.maxPrice){
        query.price = {$lte: params.maxPrice};
    }
    if(params.category){
        query.category = {$eq: params.category};
    }
    if(params.searchTerms){
        const qReg = new RegExp(params.searchTerms, 'i');
        query.$or =[
            {
                name: qReg
            },
            {
                category: qReg
            },
            {
                description: qReg
            },
            {
                ingredients: qReg
            }
        ];
    }
    
  const items = await Item.find(query); 

  return items;
};

export default {
  getItems,
};
