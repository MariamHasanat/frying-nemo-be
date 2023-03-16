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
        const condition  = new RegExp (params.searchTerms , 'i') ;
        // will receive an array
        query.$or = [
            {
                name : condition
            },
            {
                description : condition
            },
            {
                category : condition
            },
            {
                ingredients : condition
            }
        ]
    }

   
    const items = await Item.find(query);

    return items;
}

const createItems = (data: any) => {

}

export default { getItems, createItems };