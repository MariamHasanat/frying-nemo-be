import Item from "../models/item.models.js"
import { IItemQuery } from "../Type/index.js";

const getItems = async (params?: IItemQuery) => {
    const query : any = {};

    if(params?.maxPrice !== undefined) {
        query.price = {$lte : params.maxPrice}
    }

    if(params?.category) {
        query.category = {$eq : params.category};
    }

    if(params?.searchTerms) {
        query.name = new RegExp(params.searchTerms, 'i');   
    }

    console.log(query);
    

    const items = await Item.find(query);
    return items;
}

export default {getItems}