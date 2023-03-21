import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import itemsRoute from './routes/items.route.js';
import userRoute from './routes/users.route.js';
import cors from 'cors';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;

app.use(cors({ origin: 'http://localhost:3000' }));

app.use(express.json());

app.use(`/item`, itemsRoute);
app.use(`/user`, userRoute);


app.listen(port, async () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  await dbConnect();
});

const dbConnect = async () => {
  const url = `mongodb://127.0.0.1:27017/frying-nemo`;
  try {
    await mongoose.connect(url);
    console.log(`💾 [server]: Connected to the mongodb: ${url}`);
  } catch (err) {
    console.error(`💥 [server]: An error occurred while connecting to the database: ${url}, ${err}`);
  }
}