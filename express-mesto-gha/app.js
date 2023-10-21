const express = require('express');
const { errors } = require('celebrate');
const mongoose = require('mongoose');
const routes = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;
const app = express();

app.use(express.json());
app.use(routes);

mongoose.connect(DB_URL);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
