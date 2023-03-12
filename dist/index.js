import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { Item } from "./models/index.js";
dotenv.config();
const app = express();
const port = process.env.PORT || 3001;
app.get("/", (req, res) => {
    res.send("Express " + "TypeScript Server " + "Hello World");
});
app.get('/createItemTmp', (req, res) => {
    const newItem = new Item({
        name: 'maklooba',
        imageUrl: 'https//images.google.com/5238n0=2581b0',
        description: 'best recipe ever',
        price: 75,
        category: 'drinks',
        ingredients: ['ice', 'rice', 'watermelon', 'redbull'],
    });
    newItem.save().then(() => console.log('item added succesfully'));
    res.status(200).send('item added succesfully');
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    dbConnect();
});
const dbConnect = () => {
    console.log('⚡️[server]: connecting to DB...');
    mongoose
        .connect("mongodb://127.0.0.1:27017/frying-nemo")
        .then(() => {
        console.log("⚡️[server]: connected to DB 📦");
    })
        .catch((err) => {
        console.log(`⚡️[server]: Failed to connected to DB 📦 ${err}`);
    });
};
