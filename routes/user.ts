import { Router } from "express";
import { userController } from '../controllers'
import { User } from "../types/user";
const router = Router();

router.get('/:id', (req, res) => {

});

router.post('/login', (req, res) => {

})

router.post('/signup', async (req: User.UserRequest, res) => {
    await userController.createUser(req, res);
});

export default router;