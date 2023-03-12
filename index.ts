import express , {Express , Response , Request} from 'express'
import mongoose from 'mongoose'

const app : Express = express();
const port = process.env.Port || 3001;



app.listen(port , () => {
    console.log(`[server] : Server is running at mongodb://localhost:27017`);
    dbConnect();
})

const dbConnect = () => {
    console.log("Connecting to db...");
    mongoose.connect("mongodb://127.0.0.1:27017/frying-nemo")
    .then(() => {
        console.log(` [sever]: Connected to MongoDB`);
    })
    .catch((err) => {
        console.log(`[server] : Faild to connect to mongodb ${err}`);
        
    })
}