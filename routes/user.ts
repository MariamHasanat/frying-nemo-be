import express from 'express'
import { createUser, login } from '../controllers/user';
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

// login endpoint 
itemsRouter.post('/login', async (req, res) => {
  try {
    const user = await login(req);
    if (user) {
      res.status(200).send(user);
    } else {
      res.status(403).send('email or password is incorrect , please try again .')
    }
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
})

export default itemsRouter;