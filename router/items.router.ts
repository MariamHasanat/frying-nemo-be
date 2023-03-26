import express from 'express'
import Item from '../models/item.models.js'
import itemsController from '../controller/items.controller.js';
import validate, { validateItemId } from '../middleWare/items-validate.js';
import { MenuItem } from '../Type/index.js';


const router = express.Router();
router.get('/', async (req, res) => {
  const items = await itemsController.getItems(req.query);
  res.status(200).send(items);
})

router.get('/:id', validateItemId, async (req: MenuItem.ItemRequest, res: express.Response<MenuItem.Item | null>) => {
  try {
    const item = await itemsController.getItemById(req.params.id);
    res.status(200).send(item);
  } catch (error) {
    res.status(500).send();
  }
});
router.post('/' ,validate, async (req : MenuItem.ItemRequest , res ) => {

 try{
  await itemsController.creatItems(req);
  res.status(201).send();
 }catch {
    res.status(500).send("Failed to add item!");
  }
});

export default router