import express from 'express';
import { MenuItem } from '../types/index';
import itemController from '../controllers/item.controller';
import { validateItem } from '../middlewares/item-validation';


const router = express.Router();


router.get('/', async (req: MenuItem.ItemRequest, res) => {
  try {
    const items = await itemController.getItems(req.query);
    res.status(200).send(items);
  }
  catch (err) {
    res.status(500).send("Failed to get items!");
  }
});


router.post('/', validateItem, async (req: MenuItem.ItemRequest, res: express.Response) => {
  try {
    await itemController.createItem(req);
    res.status(201).send();
  }
  catch (err) {
    res.status(500).send("Failed to add item!");
  }

});

export default router;