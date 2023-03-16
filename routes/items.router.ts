import express  from "express";
import Item from "../models/items.moddel.js";
import { IItemRequest } from "../types/index.js";
import Itemcontroller from "../controoler/item.controller.js"



const itemsRouter = express.Router();

//to retrieve the whole item in the data base 
itemsRouter.get('/' , async (req:IItemRequest , res) => {
    const items = await Itemcontroller.getItem(req.query);
    res.status(200).send(items);
})

//to add item into the data base 
itemsRouter.post('/',(req:IItemRequest ,res)=>{//give type  to give auto complete 
    const newItem  = new Item ({
        name : req.body.name , 
        price: req.body.price , 
        category: req.body.category ,
        ingredients: req.body.ingredients,
        description : req.body.description ,
        imageUrl : req.body.imageUrl

    })
    newItem.save()//strore in data base 
    .then(()=>{
        res.send("item is  added into the data base")
    })
    .catch(error =>{
        res.status(500).send("somthing went wrong ,item not added")

    })
})

export  default itemsRouter //defult just can export one value but if we export object with {} i can export many thing 