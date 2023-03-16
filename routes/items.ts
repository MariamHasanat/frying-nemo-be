import express from 'express'
import Item from '../models/items';
import { IItemRequest } from '../types/index';

const itemsRouter = express.Router() ;

//to retrieve the whole items in the data base 
itemsRouter.get('/' , async (req , res) => {
    const items = await Item.find(); //it returns the items as array of js objects
    res.status(200).send(items);
})

// to add new item into the data base
itemsRouter.post ('/' , (req:IItemRequest , res) => {
    const newItem = new Item({
        name : req.body.name , 
        price: req.body.price , 
        category: req.body.category ,
        ingredients: req.body.ingredients,
        description : req.body.description ,
        imageUrl : req.body.imageUrl
    })
    newItem.save()
    .then(() => {
      res.send("Item is added into the data base :)")
    })
    .catch(error => {
      res.status(500).send("Something went wrong, item not added")
    })
})

export default itemsRouter ;