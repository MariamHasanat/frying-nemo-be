import express from "express";
import { MenuItem } from "../../types/index";
import itemController from "../../controllers/item.controller";
import { validateItem } from "../../middlewares/item-validation";

const router = express.Router();

router.get("/", async (req: MenuItem.IItemRequest, res) => {
  try {
    const items = await itemController.getItems(req.query);
    res.status(200).send(items);
  } catch (error) {
    res.status(500).send("Failed to find items!");
  }
});

router.get(
  "/:id",
  async (
    req: MenuItem.IItemRequest,
    res: express.Response<MenuItem.IItem | null | string>
  ) => {
    try {
      const item = (await itemController.getItem(req.params.id)) as
        | MenuItem.IItem
        | null
        | string;
      res.status(200).send(item);
    } catch (error) {
      res.status(500).send("Failed to find the item!");
    }
  }
);

router.post("/remove", async (req: express.Request, res: express.Response)=>{
  try {
    itemController.removeItem(req);
    res.status(200).send();
  } catch (error) {
    console.debug(error);
    res.status(500).send("Failed to find the item!");
  }
});

router.post(
  "/",
  validateItem,
  async (req: MenuItem.IItemRequest, res: express.Response) => {
    try {
      await itemController.createItem(req);
      res.status(201).send();
    } catch (error) {
      res.status(500).send("Failed to add item!");
    }
  }
);

export default router;
