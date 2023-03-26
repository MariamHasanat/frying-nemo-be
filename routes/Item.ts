import express from 'express';
import { validateItem,validateItemId } from '../middleware/item-validation'
import { MenuItem } from '../types/index.js'
import itemControl from '../controllers/item.control'


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

export default routes
