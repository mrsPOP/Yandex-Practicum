const { NODE_ENV, JWT_SECRET } = process.env;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const NotFoundError = require('../errors/notFoundError');
const BadRequestError = require('../errors/badRequestError');
const ErrorConflict = require('../errors/errorConflict');
const User = require('../models/user');

const createUser = async (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  const hash = await bcrypt.hash(password, 10);
  User.create({
      name,
      about,
      avatar,
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

const getUser = (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = User.findById(userId);
    if (!user) {
      throw new NotFoundError('Пользователь с данным _id не найден');
    }
    res.send(user);
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError('Неверный формат данных в запросе'));
    } else {
      next(err);
    }
  }
};

const getUserMe = async (req, res, next) => {
  const user = await User.findById(req.user._id);
  try {
    if (!user._id) {
      return next(new NotFoundError('Пользователь не найден'));
    }
    res.send(user);
  } catch (err) {
    next(err);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    next(err);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { name, about } = req.body;
    const user = await User.findByIdAndUpdate(
      userId,
      { name, about },
      { new: true, runValidators: true },
    );

    if (!user) {
      throw new NotFoundError('Пользователь с указанным _id не найден');
    }

    res.send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(
        new BadRequestError(
          'Переданы некорректные данные при обновлении профиля',
        ),
      );
    } else {
      next(err);
    }
  }
};

const updateAvatar = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { avatar } = req.body;
    const user = await User.findByIdAndUpdate(
      userId,
      { avatar },
      { new: true, runValidators: true },
    );

    if (!user) {
      throw new NotFoundError('Пользователь с указанным _id не найден');
    }

    res.send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(
        new BadRequestError(
          'Переданы некорректные данные при обновлении профиля',
        ),
      );
    } else {
      next(err);
    }
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

module.exports = {
  getUsers,
  getUser,
  getUserMe,
  createUser,
  updateAvatar,
  updateProfile,
  login,
};
