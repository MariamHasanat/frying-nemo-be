import mongoose from "mongoose";
import { json } from "stream/consumers";
import Item from "../models/items.moddel.js";
import { MenuItem } from "../types/index.js";

const getItem = async (params: MenuItem.ItemQuery) => {
    const query: mongoose.FilterQuery<MenuItem.Item> = {};
     
    if (params.maxPrice !== undefined) {
        query.price = { $lte: params.maxPrice }  //params.maxPrice less than  or equal 
    }

    if (params.searchTerms) {
        const qReg = new RegExp(params.searchTerms, 'i')//i for case insinsetive , regex : make easer to put condition  


        query.$or = [
            { name: qReg },
            { description: qReg },
            { category: qReg },
            { ingredient: qReg }
        ]
    }

    const categories = JSON.parse(params.categories ||'[]');
    if (categories.length) {
        query.category = { $in: categories }
    }
    console.log(JSON.stringify(query));


    const items = await Item.find(query);//return all items as a json if just () else no return specific 
    return (items);
}

const creatItem = (req:MenuItem.IItemRequest) => {
    const newItem  = new Item ({
        name : req.body.name , 
        price: req.body.price , 
        category: req.body.category ,
        ingredient: req.body.ingredient,
        description : req.body.description ,
        imageUrl : req.body.imageUrl

    })
    return  newItem.save()//strore in data base 
    .then(()=>{
        return true;//created  successfuly
    })

}
export default {
    getItem,
    creatItem
}