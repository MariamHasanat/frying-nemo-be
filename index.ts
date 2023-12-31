import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import { item } from './routers/index';
import cors from 'cors' ;

const app: Express = express();
const port = process.env.PORT || 3001;

app.use('/items',item);
app.use(express.json());
app.use(cors());


app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});



const dbConnect = () => {
  mongoose.connect("mongodb://127.0.0.1:27017/frying-nemo-db")
    .then(
      () => {
        console.log(`⚡️ [server] : connected to mongodb`);

      }
    )
    .catch((error) => {
      console.log(`⚡️ [server] : failed to connect to mongodb ${error}`);
    })
};

app.listen(port, () => {
  console.log(`⚡️ [server]: Server is running at http://localhost:${port}`);
  dbConnect();
});
