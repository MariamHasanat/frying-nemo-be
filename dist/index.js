import express from 'express';
import mongoose from 'mongoose';
const app = express();
const port = process.env.PORT || 3001;
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
const dbConnect = () => {
    mongoose.connect("mongodb://127.0.0.1:27017/frying-nemo-db")
        .then(() => {
        console.log(`[server] : connected to mongodb`);
    })
        .catch((error) => {
        console.log(`⚡️[server] : failed to connect to mongodb ${error}`);
    });
};
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    dbConnect();
});
