import express  from "express";
import Item from "../models/items.js";
import { IItemRequest } from "../types/index.js";



const itemsRouter = express.Router();

//to retrieve the whole item in the data base 
itemsRouter.get('/' , async (req , res) => {
    const items = await Item.find();//return all items 
    res.status(200).send(items);
})

//to add item into the data base 
itemsRouter.post('/',(req:IItemRequest,res)=>{
    const newItem  = new Item ({
        name : req.body.name , 
        price: req.body.price , 
        category: req.body.category ,
        ingredients: req.body.ingredients,
        description : req.body.description ,
        imageUrl : req.body.imageUrl

    })
    newItem.save()
    .then(()=>{
        res.send("item is  added into the data base")
    })
    .catch(err =>{
        res.status(500).send("somthing went wrong ,item not added")

    })
})

export  default itemsRouter