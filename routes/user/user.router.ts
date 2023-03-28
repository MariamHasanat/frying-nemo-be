import express from "express";
import { UserNS } from "../../types/index";
import userController from "../../controllers/user.controller";
import { validateUser } from "../../middlewares/user-validation";

const router = express.Router();

router.post("/", validateUser, async (req: UserNS.IUserRequest, res: express.Response) => {
    try {
      await userController.createUser(req);
      res.status(201).send();
    } catch (error) {
      res.status(500).send("Failed to add User!");
    }
  }
);

export default router;
