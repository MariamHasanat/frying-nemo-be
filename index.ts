import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import itemsRouter from './routes/items.routes';
import cors from 'cors';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;
app.use(cors());

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('this server is working ');
});

app.use('/items', itemsRouter);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running & at http://localhost:${port}`);
  dbConnect();
});

const dbConnect = () => {
  mongoose.connect("mongodb://localhost:27017/frying-nemo").then(() => {
    console.log("connecting to mongoDb");
  }).catch((err) => {
    console.log(`failed to connect to mongodb ${err}`);
  })
}