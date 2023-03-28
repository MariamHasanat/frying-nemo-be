import express from "express";
import itemController from "../controllers/user.controllers";
import { UserNS } from "../types/index";
const router = express.Router();

router.post('/', async (req: UserNS.IUserRequest, res) => {
    try {
        await itemController.createItem(req);
        res.status(201).send("user is added ");
    } catch (error) {
        res.status(500).send("Failed to add 😭");
    }
})
export default router;