require('dotenv').config();
const express = require('express');
const app = express();

const port = process.env.PORT || 3000;
const secretOrNot = process.env.SECRET || 'NotASecret';

app.get('/', (req,res) => {
  res.send('OK');
});

app.get('/api/v1/names', (req,res) => {
  res.json({names: ['GiR','GiRLaZo','Steve', 'Esteve'], secretOrNot});
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
