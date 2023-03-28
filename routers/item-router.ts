import express, { Response } from 'express';
import cors from 'cors';
import { IMenuItem } from '../interfaces/menuItems-interface';
import itemController from '../controllers/items-controller'
import { validateItem , validateItemId} from '../middlewares/logging/validate-item';
const router = express.Router();
router.use(express.json());
router.use(cors());

router.get('/', async (req: IMenuItem.IItemRequest, res) => {
  try {
    // it is like select all documents and return it filtered by query 
    const items = await itemController.getItems(req.query);

    res.status(201).send(items);
  } catch (error) {
    res.status(500).send("failed").end();
  }

});

  router.get('/:id', validateItemId, async (req: IMenuItem.IItemRequest, res: express.Response<IMenuItem.IItem | null>) => {
    try {
      const item = await itemController.getItem(req.params.id);
      res.status(200).send(item);
    } catch (error) {
      res.status(500).send();
    }
  });




router.post('/', validateItem, async (req: IMenuItem.IItemRequest, res: Response) => {

  try {
    await itemController.createItems(req.body);
    res.status(201).send("item added successfully").end();
  } catch (err) {
    res.status(500).send("failed").end();
  }


});

export default router;