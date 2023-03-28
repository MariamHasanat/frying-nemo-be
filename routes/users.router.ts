
import express from 'express';
import userController from '../controoler/user.controller.js';
import { UserNS } from '../types/index.js';



const router = express.Router();

router.post('/', async (req: UserNS.UserRequest, res) => {
  try {    
    await userController.creatUser(req);
    res.status(201).send();
  } catch (error) {
    res.status(500).send("Failed to add user!");
  }

});

export default router;