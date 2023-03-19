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
            { name: regExp },
            { description: regExp },
            { category: regExp },
            { ingredients: regExp },
        ];
    }
    const items = await Item.find(filter);
    return items;
};

const createItem = (req: MenuItems.IRequest) => {
    const newItem = new Item({
        name: req.body.name,
        ingredients: req.body.ingredients,
        category: req.body.category,
        price: req.body.price,
        description: req.body.description,
        imageURL: req.body.imageURL
    });

    return newItem.save();
};



export default {
    getItems,
    createItem,
};