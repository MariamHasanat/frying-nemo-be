var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import itemsRoute from './routes/items.js';
import userRoute from './routes/users.js';
dotenv.config();
const app = express();
const port = process.env.PORT || 3001;
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server + Hello World');
});
app.use(`/item`, itemsRoute);
app.use(`/user`, userRoute);
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    yield dbConnect();
}));
const dbConnect = () => __awaiter(void 0, void 0, void 0, function* () {
    const url = `mongodb://127.0.0.1:27017/frying-nemo`;
    try {
        yield mongoose.connect(url);
        console.log(`💾 [server]: Connected to the mongodb: ${url}`);
    }
    catch (err) {
        console.error(`💥 [server]: An error occurred while connecting to the database: ${url}, ${err}`);
    }
});
