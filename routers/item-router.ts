import express from 'express';
import { IMenuItem } from '../interfaces/menuItems-interface';
import itemController from '../controllers/items-controller'
import validateItem from '../middlewares/logging/validate-item';
const router = express.Router();
router.use(express.json());

router.get('/', async (req : IMenuItem.IItemRequest, res) => {
  try {
    // it is like select all documents and return it filtered by query 
    const items = await itemController.getItems(req.query);
    res.status(201).send({
      total: items.length, items
    });
  } catch (error) {
    res.status(500).send("failed").end();
  }


});


router.post('/', validateItem, async(req: IMenuItem.IItemRequest, res) => {

  try {
    await itemController.createItems(req.body);
    res.status(201).send("item added successfully").end();
  } catch (err) {
    res.status(500).send("failed").end();
  }


});

export default router;