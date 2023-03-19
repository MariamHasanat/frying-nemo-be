import express from "express";
import itemController from "../controllers/item.controllers";
import validateItem from "../middlewares/item-validation";
import { MenuItem } from "../types/index";
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const items = await itemController.getItems(req.query);
        res.status(200).send(items);
    } catch (error) {
        res.status(500).send("Failed to find item 😭");
    }

});
router.post('/', validateItem, async (req: MenuItem.IItemRequest, res:express.Response) => {
    try {
        await itemController.createItem(req);
        res.status(201).send("Item is added 🔥 ");
    } catch (error) {
        res.status(500).send("Failed to add 😭");
    }
})
export default router;