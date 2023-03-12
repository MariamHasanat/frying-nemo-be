import express, { Express, Request, Response } from 'express';
import User from '../models/user.js';

const router = express.Router();

router.post(`/`, async (req: Request, res: Response) => {
    const { email, password, role, fullName, imageUrl, authToken } = req.body;

    const newUser = new User({ email, password, role, fullName, imageUrl, authToken } )
    newUser.save().then(() => {
        res.sendStatus(200);
        console.log(`Successfully added user: `, newUser);
    }).catch(() => {
        res.sendStatus(500);
        console.log(`An error happened while adding user`);
    });
})

router.get(`/id`, async (req: Request, res: Response) => {
    const { userId } = req.body;
    try {
        const item = await User.findOne({ id: userId });
        res.status(200).json(item);
    } catch {
        res.sendStatus(400);
    }
})

export default router;