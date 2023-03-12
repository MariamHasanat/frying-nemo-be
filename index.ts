import express, { Express, json, Request, Response } from 'express';
import mongoose, { Model, Schema, Document } from 'mongoose';

const app: Express = express();
const port = 3006;
app.use(json());

mongoose.connect('mongodb://127.0.0.1:27017/todo', {});
const database = mongoose.connection;

database.once('connected', () => {
  console.log('Database Connected');
})

database.on('error', (err) => {
  console.error(err)
});

interface ITask {
  title: String,
  status: String,
  date: String,
}

const tasksSchema = new mongoose.Schema<ITask>({
  title: String,
  status: String,
  date: String,
}, { versionKey: false });

const Task = mongoose.model('tasks', tasksSchema);


app.get('/', async (req: Request, res: Response) => {
  const result = await Task.find();
  res.send(result);
});

app.get('/:id', async (req: Request, res: Response) => {
  const result = await Task.find();
  res.send(result);
});


app.post('/', async (req, res) => {

  const item = new Task({
    title: req.body.title,
    status: req.body.status,
    date: req.body.date,
  });

  try {
    item.save();
    res.status(200).send('Item added successfully');
  } catch (error: any) {
    res.status(500).send(error.message).end()
    console.error(error.message);
  }
});

app.listen(port, () => {
  console.log(`⚡️[server]: server is running at http://localhost:${port}`);
});
