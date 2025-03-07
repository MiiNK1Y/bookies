import { readBookiesFile } from './read.js';
import express from 'express';

const app = express();
const port = process.env.PORT;

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/bookies', (req, res) => {
  res.json(readBookiesFile());
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

