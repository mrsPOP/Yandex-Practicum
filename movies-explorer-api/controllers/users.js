const { NODE_ENV, JWT_SECRET } = process.env;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const NotFoundError = require('../errors/notFoundError');
const BadRequestError = require('../errors/badRequestError');
const ErrorConflict = require('../errors/errorConflict');
const User = require('../models/user');

// eslint-disable-next-line consistent-return
const getUserInfo = async (req, res, next) => {
  const user = await User.findById(req.user._id);
  try {
    if (!user._id) {
      return next(new NotFoundError('Пользователь не найден'));
    }
    return res.send(user);
  } catch (err) {
    next(err);
  }
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'super-strong-key', { expiresIn: '7d' });
      res.send({ message: 'Авторизация успешна', token });
    })
    .catch((err) => {
      next(err);
    });
};

const createUser = async (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  const hash = await bcrypt.hash(password, 10);
  User.create({
    name,
    email,
    password: hash,
  })
    .then((user) => {
      let userWP = JSON.stringify(user);
      userWP = JSON.parse(userWP);
      delete userWP.password;
      res.send(userWP);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании пользователя'));
      } else if (err.name === 'MongoServerError' && err.code === 11000) {
        next(new ErrorConflict('Пользователь с таким логином уже существует'));
      } else {
        next(err);
      }
    });
};

const updateUserInfo = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { name, email } = req.body;
    const user = await User.findByIdAndUpdate(
      userId,
      { name, email },
      { new: true, runValidators: true },
    );
    res.send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(
        new BadRequestError(
          'Переданы некорректные данные при обновлении данных пользователя',
        ),
      );
    } else {
      next(err);
    }
  }
};

module.exports = {
  getUserInfo,
  updateUserInfo,
  login,
  createUser,
};
