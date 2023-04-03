import express from 'express';
import { MenuItem } from '../types/index';
import itemController from '../controllers/item.controller';
import { validateItem, validateItemId } from '../middlewares/item-validation';


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

router.get('/:id', validateItemId, async (req: MenuItem.ItemRequest, res: express.Response<MenuItem.Item | null>) => {
  try {
    const item = await itemController.getItemById(req.params.id);
    res.status(200).send(item);
  } catch (error) {
    res.status(500).send();
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

router.delete('/:id', async (req: MenuItem.ItemRequest, res: express.Response) => {

  try {
    await itemController.deleteItem(req.params.id);

    res.send('Item deleted successfully !');
  }
  catch (err) {
    res.status(500).send("something went wrong, Item not deleted 💔");
  }

});

export default router;