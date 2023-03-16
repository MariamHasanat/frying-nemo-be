import { FilterQuery } from 'mongoose';
import Item from '../models/item.model';
import { MenuItems } from '../types/item.type';


const getItems = async (params: MenuItems.IQuery) => {
    const filter: FilterQuery<MenuItems.IItem> = {};

    if (params.maxPrice !== undefined) {
        filter.price = { $lte: params.maxPrice };
    }
    if (params.category) {
        filter.category = params.category;
    }
    if (params.searchTerms) {
        const regExp = new RegExp(params.searchTerms, 'i');
        filter.$or = [
            {
                name: regExp
            },
            {
                description: regExp
            },
            {
                category: regExp
            }
        ];
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