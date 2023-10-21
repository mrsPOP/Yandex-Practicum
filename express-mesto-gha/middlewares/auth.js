const jwt = require('jsonwebtoken');
const Unauthorized = require('../errors/unauthorized');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new Unauthorized('Необходима авторизация'));
  }
  const token = String(req.headers.authorization).replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, 'super-strong-key');
  } catch (err) {
    return next(new Unauthorized('Необходима авторизация'));
  }
  req.user = payload;
  return next();
};
