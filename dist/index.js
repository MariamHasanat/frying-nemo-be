import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
const app = express();
const port = process.env.PORT || 3001;
app.get("/", (req, res) => {
    res.send("Express " + "TypeScript Server " + "Hello World");
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
