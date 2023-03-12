var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express, { json } from 'express';
import mongoose from 'mongoose';
const app = express();
const port = 3006;
app.use(json());
mongoose.connect('mongodb://127.0.0.1:27017/todo', {});
const database = mongoose.connection;
database.once('connected', () => {
    console.log('Database Connected');
});
database.on('error', (err) => {
    console.error(err);
});
const tasksSchema = new mongoose.Schema({
    title: String,
    status: String,
    date: String,
}, { versionKey: false });
const Task = mongoose.model('tasks', tasksSchema);
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Task.find();
    res.send(result);
}));
app.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Task.find();
    res.send(result);
}));
app.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const item = new Task({
        title: req.body.title,
        status: req.body.status,
        date: req.body.date,
    });
    try {
        item.save();
        res.status(200).send('Item added successfully');
    }
    catch (error) {
        res.status(500).send(error.message).end();
        console.error(error.message);
    }
}));
app.listen(port, () => {
    console.log(`⚡️[server]: server is running at http://localhost:${port}`);
});
