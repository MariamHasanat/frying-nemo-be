import express from 'express';
import Item from '../models/item';

const router = express.Router();

router.get('/', async (req, res) => {
    // it is like select all documents and return it ...  
  const items = await Item.find();
  res.status(201).send(items);
});

export default router ;