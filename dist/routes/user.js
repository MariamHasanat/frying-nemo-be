"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_js_1 = __importDefault(require("../models/User.js"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const routes = express_1.default.Router();
routes.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_js_1.default.find();
    res.status(200).send(user);
}));
routes.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const token = jsonwebtoken_1.default.sign(body, body.password);
    body.authToken = token.toString();
    console.log(body.authToken);
    const NewUser = new User_js_1.default({
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
exports.default = routes;
