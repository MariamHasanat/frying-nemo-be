import express, { Express, json } from 'express';
import mongoose from 'mongoose';
import { itemRouter } from './routes';
import dotenv from 'dotenv';
import cors from 'cors';

const app: Express = express();
const port = 3006;
dotenv.config();

app.use(json());
app.use(cors());

const databaseLink: string = process.env.DB_LINK || 'none';

mongoose.connect(databaseLink, {});
const database = mongoose.connection;

database.once('connected', () => {
  console.log(`⚡️[server]: database connected successfully`);
})

database.on('error', (err) => console.error(err));

app.use('/items', itemRouter);

app.listen(port, () => {
  console.log(`⚡️[server]: server is running at http://localhost:${port}`);
});
