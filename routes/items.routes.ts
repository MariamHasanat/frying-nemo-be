import express from "express";
import itemController from "../controllers/item.controllers";
import validateItem, { validateItemId } from "../middlewares/item-validation";
import { MenuItem } from "../types/index";
const router = express.Router();

router.get('/', async (req: MenuItem.IItemRequest, res) => {
    try {
        const items = await itemController.getItems(req.query);
        res.status(201).send(items);
    } catch (error) {
        res.status(500).send("Failed to find item 😭");
    }

});
router.get('/:id',validateItemId, async (req: MenuItem.IItemRequest, res:express.Response<MenuItem.IItem | null |string>) => {
    try {
        const item = await itemController.getItem(req.params.id) as MenuItem.IItem | null;
        res.status(200).send(item);
    } catch (error) {
        res.status(500).send("Failed to find item 😭");
    }

});
router.post('/', validateItem, async (req: MenuItem.IItemRequest, res:express.Response) => {
    try {
        await itemController.createItem(req);
        res.status(201).send("item is added ");
    } catch (error) {
        res.status(500).send("Failed to add 😭");
    }
})
export default router;