import express from "express";
import User from "../models/User.js";
import { UsersInfo } from '../types/index';
import userController from "../controllers/user.controller.js";
const routes = express.Router()

routes.get('/', async (req:UsersInfo.UserRequest, res) => {
    const user = await userController.CreateUser(req);
    res.status(200).send(user)
})

routes.post("/", async (req:UsersInfo.UserRequest , res) => {

  


})

export default routes