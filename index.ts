import express, { Express } from 'express';
import dotenv from 'dotenv';
import mongoose, { MongooseError } from 'mongoose';
import { itemsRouter } from './routers/index';
import { logger } from './middleware/index';
import cors from 'cors';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;
app.use(express.json());

app.use(cors());
app.use(logger);


app.use('/items', itemsRouter);


app.listen(port, () => {
    console.log(`⚡️ [server]: Server is running at http://localhost:${port}`);
    mongoose.connect('mongodb://127.0.0.1:27017/frying-nemo')
        .then(() => {
            console.log('🤗 [server]: Connected to MongoDB');

        })
        .catch((error: MongooseError) => {
            console.log(`🤨 [server]: Failed to connect to mongodb ${error.message}`);
        });
});