import { Router, Request, Response } from "express";
import Item from "../models/item.js";
import { MenuItem } from "../types/item.js";
import {itemController} from '../controllers';

const router = Router();

router.get('/', async (req: MenuItem.IItemRequest, res: Response) => {
    const query = req.query;
    const result = await itemController.getItems(query);
    res.send(result);
});

router.get('/:id', async (req: Request, res: Response) => {
    const itemId = req.params.id;
    const result = await Item.findOne({ _id: itemId });
    res.send(result);
});

router.delete('/:id', async (req, res) => {
    const itemId = req.params.id;
    const result = await Item.deleteOne({ _id: itemId });
    res.status(200).send('deleted successfully');
})

router.post('/', async (req: MenuItem.IItemRequest, res) => {
    const newItem = req.body;
    console.log({ newItem });
    itemController.createItem(req, res);
    res.status(201).end();
});

router.put('/', (req, res) => {

});
export default router;