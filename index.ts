import express from 'express';
const app = express();
const PORT = 3001;

app.listen(PORT, () => console.debug('Server is listening on port', PORT));