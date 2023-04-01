import mongoose from "mongoose";
import Item from "../models/items.moddel.js";
import { MenuItem } from "../types/index.js";
import User from "../models/user.model.js";

const getItem = async (params: MenuItem.ItemQuery) => {
    const query: mongoose.FilterQuery<MenuItem.Item> = {};

    if (params.maxPrice !== undefined) {
        query.price = { $lte: params.maxPrice }  //params.maxPrice less than  or equal 
    }

    if (params.searchTerm) {
        const qReg = new RegExp(params.searchTerm, 'i')//i for case insinsetive , regex : make easer to put condition  


        query.$or = [
            { name: qReg },
            { description: qReg },
            { category: qReg },
            { ingredient: qReg }
        ]
    }

    const categories = JSON.parse(params.categories || '[]');
    if (categories.length) {
        query.category = { $in: categories }
    }
    console.log(JSON.stringify(query));


    const items = await Item.find(query, null, { sort: { '_id': -1 } })//return all items as a json if just () else no return specific and sort it dec
    .populate({
        path: 'addedBy',
        select: ['fullName', 'email', 'imageUrl']
      });
  
    // If you want edit the data before sending them to client
    // const parsedItem = items.map(itm => (
    //   {
    //     ...itm.toJSON(),
    //     addedBy: { ...itm.addedBy?.toJSON() as any, password: '****' }
    //   })
    // )
    // return parsedItem;
   
    return (items);
}

const creatItem = (req: MenuItem.IItemRequest) => {
    const newItem = new Item({
        name: req.body.name,
        price: req.body.price ?? 10, // ?? instead of if (req.body.price === null || req.body.price === undefined) {
        //   newItem.price = 10
        category: req.body.category,
        ingredient: req.body.ingredient,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        addedBy :req.body.addedBy

    })
    return newItem.save()//strore in data base 
        .then(async() => {
          //to store what items each user created
          await User.findByIdAndUpdate(req.body.addedBy,{$push:{items:newItem._id}})

            return true;//created  successfuly
        })

}

const getItemById = async (itemId: string) => {
    const itemDoc = await Item.findById(itemId).populate({ //or we can use findOne  
    path: 'addedBy',
    select: ['fullName', 'email', 'imageUrl']

    }) 
    if (itemDoc) {
        const item: MenuItem.Item = {
            name: itemDoc.name,
            category: itemDoc.category || '',
            description: itemDoc.description || '',
            imageUrl: itemDoc.imageUrl || '',
            ingredient: itemDoc.ingredient,
            price: itemDoc.price || 0
        }
        return item;
    }
    return null;
}
const DeleteById = async (itemId: string) => {
        const deletedItem = await Item.findByIdAndDelete(itemId);
        if (deletedItem) {     
        const remainingItems = await Item.find(); // retrieve all remaining items
        return remainingItems;
        }
        return null;
}
const updateItemById = async (req: MenuItem.IItemRequest) => {
    const itemDoc = await Item.findById(req.params.id);//or we can use findOne
    if (itemDoc) {
        const item: MenuItem.Item = {
            name: itemDoc.name||req.body.name,
            category: itemDoc.category ||req.body.category ,
            description: itemDoc.description || req.body.description,
            imageUrl: itemDoc.imageUrl || req.body.imageUrl,
            ingredient: itemDoc.ingredient||req.body.ingredient,
            price: itemDoc.price || req.body.price
        }
        return item;
    }
    return null;
}
export default {
    getItem,
    getItemById,
    DeleteById,
    updateItemById,
    creatItem
}