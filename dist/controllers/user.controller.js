"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
const CreateUser = (req) => {
    const user = new User_1.default(req);
    return user.save();
};
exports.default = {
    CreateUser
};
