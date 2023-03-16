import Item from '../models/item.model';
import { MenuItems } from '../types/item.type';


const getItems = async (params: MenuItems.IQuery) => {
    const filter: any = {};
    if (params.maxPrice !== undefined) {
        filter.price = { $lte: params.maxPrice };
    }
    if (params.category) {
        filter.category = params.category;
    }
    if (params.searchTerms) {
        filter.name = new RegExp(params.searchTerms, 'i');
    }
    const items = await Item.find(filter);
    return items;
};

const createItem = () => {

};



export default {
    getItems,
    createItem,
};