import { Response, Request, Router } from "express";
import { Item } from "../../models/index";
import { IItemRequest } from "../../types/index";
import itemController from "../../controllers/item.controller";
const router = Router();
router.put("/:id", (req: Request, res: Response) => {});

router.get("/", async (req: Request, res: Response) => {
  try {
    const items = await itemController.getItems(req.query)
    res.status(200).send(items);
  } catch (error) {
    console.debug("from items: ",error);
    res.status(400);
  }
});

router.post("/", (req: IItemRequest, res: Response) => {
  const tempItem = req.body;
  if (!tempItem.name || !tempItem.category)
    res.status(400).send("name or category is missing");
  if (!tempItem.price || typeof tempItem.price !== "number")
    res.status(400).send("price should be a number");
  const newItem = new Item({
    name: tempItem.name,
    category: tempItem.category,
    ingredients: tempItem.ingredients,
    description: tempItem.description,
    imageUrl: tempItem.imageUrl,
    price: tempItem.price,
  });
  newItem
    .save()
    .then(() => {
      res.status(200).send("item added succesfully");
    })
    .catch((err) => {
      console.log(err);

      res.status(400).send(`we couldn't add the item`);
    });
});



export default router;
