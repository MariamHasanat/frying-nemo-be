import express from 'express';
import { User } from '../types/index';
import userController from '../controllers/user.controller';

const router = express.Router();

// router.post('/', async (req: User.IUser, res) => {
//   try {    
//     await userController.createItem(req);
//     res.status(201).send();
//   } catch (error) {
//     res.status(500).send("Failed to add user!");
//   }

// });

export default router;