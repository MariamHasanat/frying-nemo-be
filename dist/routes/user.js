var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
import User from "../models/User.js";
import jwt from 'jsonwebtoken';
const routes = express.Router();
routes.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User.find();
    res.status(200).send(user);
}));
routes.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const token = jwt.sign(body, body.password);
    body.authToken = token.toString();
    console.log(body.authToken);
    const NewUser = new User({
        password: body.password,
        email: body.email,
        fullName: body.fullName,
        role: body.role,
        imageUrl: body.imageUrl || "image not add yet",
        USERtoken: body.authToken || "no token"
    }).save()
        .then(() => {
        res.status(201).send("new User created successful");
    }).catch(() => {
        res.status(400).send("Failed to create User");
    });
}));
export default routes;
