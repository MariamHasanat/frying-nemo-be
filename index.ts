import express, { Express, json } from 'express';
import mongoose from 'mongoose';
import { itemRouter } from './routes';

const app: Express = express();
const port = 3006;
app.use(json());

mongoose.connect('mongodb://127.0.0.1:27017/frying-nemo', {});
const database = mongoose.connection;

database.once('connected', () => {
  console.log(`⚡️[server]: connected successfully`);
})

database.on('error', (err) => {
  console.error(err)
});

app.use('/items', itemRouter);

app.listen(port, () => {
  console.log(`⚡️[server]: server is running at http://localhost:${port}`);
});
