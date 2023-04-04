import express from "express";
import userControllers from "../controllers/user.controllers";
import itemController from "../controllers/user.controllers";
import { UserNS } from "../types/index";
const router = express.Router();

router.post('/', async (req: UserNS.IUserRequest, res) => {
    try {
        await userControllers.createUser(req);
        res.status(201).send("user is added ");
    } catch (error) {
        res.status(500).send("Failed to add 😭");
    }
});

router.post('/login', async (req: UserNS.LoginRequest, res) => {
    try {
        const user = await userControllers.login(req);
        if (user) {
            res.status(200).send(user);
        }
        else {
            res.status(403).send("User name or password is invalid!");
        }
    } catch (error) {
        res.status(500).send("Failed to login user!");
    }

});
export default router;