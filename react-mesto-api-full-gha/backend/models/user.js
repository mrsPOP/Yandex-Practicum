const bcrypt = require('bcryptjs');
const { Schema, model } = require('mongoose');
const { isEmail, isURL } = require('validator');
const Unauthorized = require('../errors/unauthorized');

const userSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 30,
      default: 'Жак-Ив Кусто',
    },
    about: {
      type: String,
      minlength: 2,
      maxlength: 30,
      default: 'Исследователь',
    },
    avatar: {
      type: String,
      default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
      validate: {
        validator: (v) => isURL(v, { required_protocol: true }),
        message: "Поле 'avatar' не соответствует формату URL",
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (v) => isEmail(v),
        message: 'Неправильный формат почты',
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  { versionKey: false },
);

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new Unauthorized('Указан некорректный Email или пароль.');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new Unauthorized('Указан некорректный Email или пароль.');
          }
          return user;
        });
    });
};

module.exports = model('user', userSchema);
