import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();
const app = express();
const port = process.env.PORT || 3001;
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    dbConnect();
});
const dbConnect = () => {
    console.log("connecting to the data base ...");
    mongoose.connect("mongodb://127.0.0.1:27017/frying-nemo") // this function accepts uri string that consists of this parts : mongodb://host-name:port/DB-name
        .then(() => {
        console.log("Server connected to the data base successfully !");
    }).catch(() => {
        console.log("Server faild to connet to the data base :(");
    });
};
