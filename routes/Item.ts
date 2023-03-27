import express from 'express';
import { validateItem, validateItemId } from '../middleware/item-validation'
import { MenuItem } from '../types/index.js'
import itemControl from '../controllers/item.control'
import Item from "../models/items"
import { error } from 'console';


const routes = express.Router();

routes.get('/', async (req: MenuItem.ItemRequest, res: express.Response) => {
  const items = await itemControl.getItems(req.query);
  res.status(200).send(items);
});

routes.get('/:id', validateItemId, async (req: MenuItem.ItemRequest, res: express.Response<MenuItem.IItem | null>) => {
  try {
    const item = await itemControl.getItemByID(req.params.id);
    res.status(200).send(item as MenuItem.IItem);
  } catch (error) {
    res.status(500).send();
  }
});

routes.post('/', validateItem, async (req: MenuItem.ItemRequest, res: express.Response, next: express.NextFunction) => {
  try {
    await itemControl.createItem(req);
    res.status(201).send();
  } catch (error) {
    next(error);
  }
});

routes.put("/:id", async (req: MenuItem.ItemRequest, res: express.Response<MenuItem.IItem | null>) => {
  Item.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(item => {
      res.status(200).send()
      console.log(item);
    })
    .catch(err => {
      console.error(err);
    });


    routes.delete("/:id", async (req: MenuItem.ItemRequest, res: express.Response<MenuItem.IItem | null>) => {
      console.log("deletedItem")
      try {
        const deletedItem = await Item.findByIdAndDelete(req.params.id);
        if (!deletedItem) {
          return res.status(200).send();
        }
        res.status(200).send();
      } catch (err) {
        console.log(err);
        res.status(500).send();
      }
    });
})

export default routes
