"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const items_routes_1 = __importDefault(require("./routes/items.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
app.get('/', (req, res) => {
    res.send('this server is working ');
});
app.use(express_1.default.json());
app.use('/items', items_routes_1.default);
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running & at http://localhost:${port}`);
    dbConnect();
});
const dbConnect = () => {
    mongoose_1.default.connect("mongodb://localhost:27017/frying-nemo").then(() => {
        console.log("connecting to mongoDb");
    }).catch((err) => {
        console.log(`failed to connect to mongodb ${err}`);
    });
};
