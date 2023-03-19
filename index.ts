import express, { Express, json } from 'express';
import mongoose from 'mongoose';
import { itemRouter } from './routes';
import dotenv from 'dotenv';

const app: Express = express();
const port = 3006;
app.use(json());
dotenv.config()

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
