"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const index_1 = require("./models/index");
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
app.get('/createItemTmp', (req, res) => {
    // when you use the postman, the url which you should use is the url for node express application, hence you will use the localhost/3001 , not the url for the server of the mongodb
    const createNewItem = new index_1.Item({
        name: "Kunafa",
        category: "desalination",
        ingredients: ["sugar", "cheese", "kunafa dough"],
        description: "something tasty",
        price: 10.15
    });
    createNewItem.save()
        .then(() => {
        res.send("item added successfully").end();
    })
        .catch((err) => {
        res.status(500).send(err.message).end();
    });
});
const dbConnect = () => {
    mongoose_1.default.connect("mongodb://127.0.0.1:27017/frying-nemo-db")
        .then(() => {
        console.log(`⚡️ [server] : connected to mongodb`);
    })
        .catch((error) => {
        console.log(`⚡️ [server] : failed to connect to mongodb ${error}`);
    });
};
app.listen(port, () => {
    console.log(`⚡️ [server]: Server is running at http://localhost:${port}`);
    dbConnect();
});
