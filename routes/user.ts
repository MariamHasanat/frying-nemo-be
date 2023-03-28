
import express from 'express';
import { UserNS } from '../type/index.js';
import userController from '../controllers/user.js';

const router = express.Router();

router.post('/', async (req: UserNS.UserRequest, res) => {
  try {    
    await userController.createUser(req);
    res.status(201).send();
  } catch (error) {
    res.status(500).send("Failed to add user!");
  }

});

export default router;