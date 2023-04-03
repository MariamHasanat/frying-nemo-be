import express, { Router } from 'express';
import { LoginNS, Users } from '../types/item.type';
import UserController from '../controllers/user.controller';
import { Status } from '../classes/status';

const router = Router();

router.post('/', async (req: Users.IRequest, res: express.Response) => {
    try {
        const created = await UserController.createUser(req);
        res.status(created.status).send(created);
    }
    catch (error) {
        console.error(error);
        res.status(500).send(new Status(500, 'Failed, There is an error and the item is not added'));
    };
});

router.get('/', async (req: Users.IRequest, res: express.Response) => {
    try {
        const users = await UserController.getUsers();
        res.status(users.status).send(users);
    }
    catch (error) {
        console.error(error);
        res.status(500).send(new Status(500, 'Failed, Internal server error'));
    }
});

router.post('/login', async (req: LoginNS.Request, res: express.Response) => {
    try {
        const login = await UserController.login(req);
        res.status(login.status).send(login);
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed, Internal server error');
    }

});


export default router;
