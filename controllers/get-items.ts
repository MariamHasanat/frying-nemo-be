import { IMenuItem } from "../interfaces/item";
import Item from "../models/item"

const getItems = async (params: IMenuItem.IItemQuery) => {
    const query: any = {
    }
    if (params.maxPrice !== undefined) {
        query.price  =   { $lte: params.maxPrice }
    }
    if (params.category) {
        query.category  =   { $eq: params.category }
    }
    if (params.searchTerms) {
        query.name  = new RegExp (params.searchTerms , 'i') ;
    }

   
    const items = await Item.find(query);

    return items;
}

const createItems = (data: any) => {

}

export default { getItems, createItems };