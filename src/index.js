require('dotenv').config();
const express = require('express');
const app = express();

const port = process.env.PORT || 3000;
const secretOrNot = process.env.SECRET || 'NotASecret';

app.use(express.json());
const secretRoutes = require('./infrastructure/http/secret-controller');

app.use('/api/v1/secret', secretRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
