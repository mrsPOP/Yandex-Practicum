const { INTERNAL_SERVER_ERROR } = require('../errors/statusCode');

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  const { statusCode = INTERNAL_SERVER_ERROR, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === INTERNAL_SERVER_ERROR
        ? 'На сервере произошла ошибка'
        : message,
    });
};

module.exports = errorHandler;
