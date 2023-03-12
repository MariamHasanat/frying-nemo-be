import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Item from './models/item.js';
dotenv.config();
const app = express();
const port = process.env.PORT || 3001;
app.get('/', (req, res) => {
    res.send('this server is working ');
});
app.get('/createItemTmp', (req, res) => {
    const newItem = new Item({
        name: 'Qidra',
        category: 'Main Dish',
        ingredients: ['rice', 'water', 'salt', 'chicken'],
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam architecto illo facere, officiis ab, vitae itaque voluptatem repudiandae perspiciatis',
        price: 20.5
    });
    newItem.save().then(() => { res.send("item is added "); }).catch((err) => {
        res.status(500).send("failed to add :( " + err.message);
    });
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running & at http://localhost:${port}`);
    dbConnect();
});
const dbConnect = () => {
    mongoose.connect("mongodb://localhost:27017/frying-nemo").then(() => {
        console.log("connecting to mongoDb");
    }).catch((err) => {
        console.log(`failed to connect to mongodb ${err}`);
    });
};
