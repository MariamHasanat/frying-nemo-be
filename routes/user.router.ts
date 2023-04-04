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

router.post('/login', (req: User.ILoginRequest, res) => {
    console.log('hello world');
    userController.userLogin(req)
        .then((userObj) => {
            if (userObj) {
                res.status(200).send(userObj);
            } else {
                res.status(400).send("email/password combination does not exist")
            }
        }).catch((err) => res.status(500).send(`failed to login user\n${err}`));
})

export default router;