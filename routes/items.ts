import express from 'express'
import { createItem, getItems } from '../controllers/items';
import { IItemRequest } from '../types/index';

const itemsRouter = express.Router() ;

//to retrieve the whole items in the data base 
itemsRouter.get('/' , async (req , res) => {
    const items = await getItems(); 
    res.status(200).send(items);
})

// to add new item into the data base
itemsRouter.post ('/' , (req:IItemRequest , res) => {
    createItem(req.body)
    .then(() => {
      res.send("Item is added into the data base :)")
    })
    .catch(error => {
      res.status(500).send("Something went wrong, item not added")
    })
})

export default itemsRouter ;