import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { Item } from "./models/index";
import { itemRouter,userRouter } from "./routes/index";
import cors from "cors";
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());
app.use("/items", itemRouter);
app.use("/users", userRouter);
app.get("/", (req: Request, res: Response) => {
  res.send("Express " + "TypeScript Server " + "Hello World");
});
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  dbConnect();
});

const dbConnect = () => {
  console.log("⚡️[server]: connecting to DB...");
  mongoose
    .connect("mongodb://127.0.0.1:27017/frying-nemo")
    .then(() => {
      console.log("⚡️[server]: connected to DB 📦");
    })
    .catch((err) => {
      console.log(`⚡️[server]: Failed to connected to DB 📦 ${err}`);
    });
};
