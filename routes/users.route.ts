import express, { Express, Request, Response } from 'express';
import User from '../models/user.js';
import { IUser } from '../types/index.js';

const router = express.Router();

router.post(`/`, async (req: IUser.Request, res: Response) => {
    const { email, password, role, fullName, imageURL }: IUser.User = req.body;
    console.log(`post user: ` , { email, password, role, fullName, imageURL })
    const newUser = new User({ email, password, role, fullName, imageURL })
    newUser.save().then(() => {
        res.status(200).send(newUser);
        console.log(`Successfully added user: `, newUser);
    }).catch((e) => {
        res.sendStatus(400);
        console.log(`An error happened while adding user`);
    });
})

router.post(`/auth`, async (req: IUser.Request, res: Response) => {
    const { email, password }: IUser.User = req.body;
    const user = await User.findOne({ email, password });
    res.status(user != null ? 200 : 400).send(user);
})

router.get(`/:userId`, async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
        await User.findOne({ _id: userId });
        res.status(200);
    } catch (err: any) {
        res.status(400).send(err?.message);
    }
})

router.delete(`/:userId`, async (req: Request, res: Response) => {
    const { userId } = req.params;
    const item = await User.findOneAndDelete({ _id: userId });
    item ? res.sendStatus(200) : res.status(400).send("User not found");
})

export default router;