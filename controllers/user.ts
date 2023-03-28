import { Response } from "express";
import { UserModel } from "../models";
import { User } from "../types/user";

const createUser = async (req: User.UserRequest, res: Response) => {
    try {
        const newUser = new UserModel({
            ...req.body
        });

        await newUser.save();
        res.status(201).send('added successfully');
    } catch (err) {
        res.status(409).send('Error');
    }
    // console.log(newUser);
}

export default {
    createUser,
}