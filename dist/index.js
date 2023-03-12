import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const port = process.env.PORT || 3001;
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server + Hello World');
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    connectToDB();
});
const connectToDB = () => {
    console.log("connecting");
    mongoose.connect("mongodb://127.0.0.1:27017")
        .then(() => console.log('successfully connected to database!'))
        .catch((err) => console.log(`something went wrong ;-(\n${err}`));
};
