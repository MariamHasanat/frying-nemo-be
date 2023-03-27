import express from 'express'
import { createItem, deleteItem, getItems, getSingleItem } from '../controllers/items';
import { MenuItem } from '../types/index';
import { validateItem, validateItemId } from '../middleware/validation'

const itemsRouter = express.Router();

//to retrieve the whole items in the data base 
itemsRouter.get('/', async (req, res) => {
  const items = await getItems(req.query);
  res.status(200).send(items);
})

itemsRouter.get('/:id', validateItemId , async (req:MenuItem.IRequest, res) => {
  const item = await getSingleItem(req.params.id) as MenuItem.IItem;
  if (item) {
    res.send(item)
  }
  else {
    res.status (500).send ('something went wrong')
  }
})

itemsRouter.delete('/:id', async (req, res) => {
  deleteItem(req.params.id)
  .then (() => {
    res.send('Item deleted successfully :)')
  })
  .catch ((error) => {
    console.log(error.message);
    res.status(500).send("something went wrong, Item not deleted :(")
  })
})

itemsRouter.put('/:id', async (req, res) => {

})

// to add new item into the data base
itemsRouter.post('/', validateItem, (req: MenuItem.IRequest, res) => {
  createItem(req.body)
    .then(() => {
      res.status(201).send("Item is added into the data base :)")
    })
    .catch(error => {
      console.log(error.message);
      res.status(500).send("Something went wrong, item not added")
    })
})

export default itemsRouter;