import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import {Item} from "./models/index.js"
import  ItemsRouter  from './routes/Item.js';
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;

app.use(express.json())
app.use("/items",ItemsRouter)

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  dbConnection()
});

const dbConnection = () => {
mongoose.connect("mongodb://127.0.0.1:27017/frying-nemo")
.then(()=>
{
  console.log('🟢🟢🟢 [server]: connection established 🟢🟢🟢	')
}).catch(err => {
  console.log(`🔴🔴🔴 [server]: Failed to connect 🔴🔴🔴 , ${err}`)
})

}