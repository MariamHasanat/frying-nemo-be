import express from 'express'
import { createUser } from '../controllers/user';
import { UserNS } from '../types/index';

const itemsRouter = express.Router();

// to add new item into the data base
itemsRouter.post('/', (req: UserNS.IUserRequest, res) => {
  createUser(req.body)
    .then(() => {
      res.status(201).send("User is added into the data base :)")
    })
    .catch(error => {
      console.log(error.message);
      res.status(500).send("Something went wrong, user not added")
    })
})

export default itemsRouter;