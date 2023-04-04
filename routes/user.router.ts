import express from 'express';
import { User as UserNs } from '../types/index';
import userController from '../controllers/user.controller';

const router = express.Router();

router.post('/signup', async (req: UserNs.IUserRequest, res) => {
    console.log('welcome!')
    try {
        await userController.createUser(req.body);
        res.status(201).send();
    } catch (error) {
        res.status(500).send(`Failed to create user...\n${error}`);
    }

});

router.post('/login', (req: UserNs.ILoginRequest, res) => {
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