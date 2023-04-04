import { FilterQuery } from 'mongoose';
import { Status } from '../classes/status';
import Item from '../models/item.model';
import { MenuItemsNS } from '../types/item.type';
import mongoose from 'mongoose';
import User from '../models/user.model';

const getItems = async (params: MenuItemsNS.IQuery) => {
    const filter: FilterQuery<MenuItemsNS.IItem> = {};

    if (params.maxPrice !== undefined) {
        filter.price = { $lte: params.maxPrice };
    }
    const categories: [] = JSON.parse(params.categories || '[]');
    if (categories.length) {
        filter.category = { $in: categories };
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

    const items = await Item.find(filter, null, { sort: { '_id': -1 } });
    return items;
};

const getItem = async (req: MenuItemsNS.IRequest) => {
    const item = await Item.findById(req.params.id)
        .populate({
            path: 'addedBy',
            select: ['fullName', 'email'],
        });

    if (item) {
        const returnedItem: MenuItemsNS.IItem = {
            _id: item._id,
            name: item.name || '',
            price: item.price || 10,
            category: item.category || '',
            image: item.image || '',
            description: item.description || '',
            ingredients: item.ingredients || [],
            addedBy: item.addedBy
        };
        return new Status(200, 'OK', returnedItem);
    }
    return new Status(400, 'Failed');
};

const createItem = async (req: MenuItemsNS.IRequest) => {

    const newItem = new Item({
        name: req.body.name,
        ingredients: req.body.ingredients,
        category: req.body.category,
        price: req.body.price ?? 10,
        description: req.body.description,
        image: req.body.image,
        addedBy: req.body.addedBy,
    });

    return newItem.save()
        .then(value => {
            const item = value;
            return User.findByIdAndUpdate(req.body.addedBy, { $push: { items: item._id } })
                .then(value => {
                    return new Status(201, ' OK, the item is added');
                })
                .catch((err: mongoose.Error) => {
                    console.error(err.message);
                    return new Status(500, 'Internal server error');
                });

        }).catch((error: mongoose.Error) => {
            console.error(error.message);
            return new Status(500, 'Internal server error');
        });
};

const deleteItem = async (id: string) => {
    const del = await Item.deleteMany({ _id: id });

    if (del.acknowledged)
        return new Status(200, 'OK, the item is deleted');
    return new Status(500, 'Internal server error');

};

const updateItem = (id: string, item: MenuItemsNS.IItem) => {
    console.log(item);

    return Item.findByIdAndUpdate(id, {
        name: item.name,
        addedBy: item.addedBy,
        category: item.category,
        description: item.description,
        image: item.image,
        ingredients: item.ingredients,
        price: item.price

    }).then(value => {
        if (value) {
            return new Status(200, 'OK, the item is updated', value);
        }
        else {
            return new Status(500);
        }
    }).catch((error: mongoose.Error) => {
        console.error(error.message);
        return new Status(500);
    });
};



export default {
    getItems,
    getItem,
    createItem,
    deleteItem,
    updateItem,
};