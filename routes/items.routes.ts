import express from 'express';
import { MenuItem } from '../types/index';

import { validateItem, validateItemId } from '../middlewares/item-validation';
import itemControllers from '../controllers/item.controllers';

const router = express.Router();

router.get('/', async (req: MenuItem.ItemRequest, res) => {
  try {
    const items = await itemControllers.getItems(req.query);
    res.status(200).send(items);
  } catch (error) {
    res.status(500).send("Failed to find items!");
  }
});

router.get('/:id', validateItemId, async (req: MenuItem.ItemRequest, res: express.Response<MenuItem.Item | null>) => {
  try {
    const item = await itemControllers.getItemById(req.params.id);
    res.status(200).send(item);
  } catch (error) {
    res.status(500).send();
  }
});

router.post('/', validateItem, async (req: MenuItem.ItemRequest, res: express.Response) => {
  try {
    await itemControllers.createItem(req);
    res.status(201).send();
  } catch (error) {
    res.status(500).send("Failed to add item!");
  }

});

export default router;