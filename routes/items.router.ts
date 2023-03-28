import express from "express";
import { MenuItem } from "../types/index.js";
import Itemcontroller from "../controoler/item.controller.js"
import itemController from "../controoler/item.controller.js";
import { validItem, validItemId } from "../middleware/item_validation.js";



const itemsRouter = express.Router();

//to retrieve the whole item in the data base 
itemsRouter.get('/', async (req: MenuItem.IItemRequest, res) => {
    try {
        const items = await Itemcontroller.getItem(req.query);
        res.status(200).send(items);
    }
    catch(err) {
        res.status(500).send("failed find the item")
    }

})

itemsRouter.get('/:id',validItemId, async (req: MenuItem.IItemRequest, res : express.Response<MenuItem.Item|null>) => {
    try {
        const item = await Itemcontroller.getItemById(req.params.id);
        res.status(200).send(item);
    }
    catch(err) {
        res.status(500).send()
    }

})

itemsRouter.delete('/:id',validItemId, async (req: MenuItem.IItemRequest, res: express.Response) => {
    try {
        const items = await Itemcontroller.DeleteById(req.params.id);
        res.status(200).send(items);
    }
    catch(err) {
        res.status(500).send()
    }

})

itemsRouter.put('/:id',validItemId, async (req: MenuItem.IItemRequest, res : express.Response<MenuItem.Item|null>) => {
    try {
        const item = await Itemcontroller.updateItemById(req);
        res.status(200).send(item);
    }
    catch(err) {
        res.status(500).send()
    }

})

//to add item into the data base 
itemsRouter.post('/',validItem, async(req: MenuItem.IItemRequest, res : express.Response) => {//give type  to give auto complete 
    try {
        await itemController.creatItem(req);
        res.status(201).send();
      } catch (error) {
        res.status(500).send("Failed to add item!");
      }
})

export default itemsRouter //defult just can export one value but if we export object with {} i can export many thing 