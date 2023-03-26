import express from "express";
import User from "../models/User.js";
import { UsersInfo } from '../types/index';
import jwt from 'jsonwebtoken';
const routes = express.Router()

routes.get('/', async (req, res) => {
    const user = await User.find()
    res.status(200).send(user)
})

routes.post("/", async (req:UsersInfo.UserRequest , res) => {
    const body= req.body;
const token= jwt.sign(body,body.password)
body.authToken=token.toString()
console.log(body.authToken)

    const NewUser = new User({
        
     password:body.password,
     email:body.email,
     fullName:body.fullName,
     role:body.role,
     imageUrl:body.imageUrl||"image not add yet",
     USERtoken:body.authToken||"no token"
     
    }).save()
        .then(() => {
            res.status(201).send("new User created successful")
        }).catch(() => {
            res.status(400).send("Failed to create User")
        })


})

export default routes