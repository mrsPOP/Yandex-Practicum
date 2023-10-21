const express = require('express');
const { errors } = require('celebrate');
const mongoose = require('mongoose');
const routes = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
require('dotenv').config();

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;
const app = express();

app.use(express.json());
app.use(requestLogger);
app.use(routes);

mongoose.connect(DB_URL);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
