import express from 'express'
import { createItem, getItems, getSingleItem } from '../controllers/items';
import { MenuItem } from '../types/index';
import { validateItem } from '../middleware/validation'

const itemsRouter = express.Router();

//to retrieve the whole items in the data base 
itemsRouter.get('/', async (req, res) => {
  const items = await getItems(req.query);
  res.status(200).send(items);
})

itemsRouter.get('/:id', async (req, res) => {
  const item = await getSingleItem(req.params.id);
  res.send(item)
})

itemsRouter.delete('/:id', async (req, res) => {

})

itemsRouter.put('/:id', async (req, res) => {

})

// to add new item into the data base
itemsRouter.post('/', validateItem, (req: MenuItem.IRequest, res) => {
  createItem(req.body)
    .then(() => {
      res.send("Item is added into the data base :)")
    })
    .catch(error => {
      res.status(500).send("Something went wrong, item not added")
    })
})

export default itemsRouter;