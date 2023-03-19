import express from 'express';
import mongoose from 'mongoose';
import Item from '../models/item-schema';
import { IMenuItem } from '../interfaces/menuItems-interface';
import itemController from '../controllers/items-controller'
import validateItem from '../middlewares/logging/validate-item';
const router = express.Router();
router.use(express.json());

router.get('/', async (req, res) => {
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


router.post('/', validateItem, (req: IMenuItem.IItemRequest, res) => {

  try {
    itemController.createItems(req.body);
    res.status(201).send("item added successfully").end();
  } catch (err) {
    res.status(500).send("failed").end();
  }


});

export default router;