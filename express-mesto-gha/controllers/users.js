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
  User.findOne({ email })
    .then((user) => {
      if (user) {
        next(new ErrorConflict('Пользователь с таким email уже зарегистрирован'));
      }
      return bcrypt.hash(password, 10);
    })
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => {
      let userWP = JSON.stringify(user);
      userWP = JSON.parse(userWP);
      delete userWP.password;
      return userWP;
    })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании пользователя'));
      } else {
        next(err);
      }
    });
};

const getUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
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
      next(new NotFoundError('Пользователь не найден'));
    }
    res.send(user);
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError('Переданы некорректные данные.'));
    } else {
      next(err);
    }
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
      const token = jwt.sign({ _id: user._id }, 'super-strong-key', { expiresIn: '7d' });
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        sameSite: true,
        httpOnly: true,
      });
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
