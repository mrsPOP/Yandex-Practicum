const { Schema, model } = require('mongoose');

const { ObjectId } = Schema.Types;
const { regex } = require('../utils/validationUtils');

const movieSchema = new Schema(
  {
    country: {
      type: String,
      required: true,
    },

    director: {
      type: String,
      required: true,
    },

    duration: {
      type: Number,
      required: true,
    },

    year: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
      validate: {
        validator: (url) => regex.test(url),
        message: 'Не является ссылкой',
      },
    },

    trailerLink: {
      type: String,
      required: true,
      validate: {
        validator: (url) => regex.test(url),
        message: 'Не является ссылкой',
      },
    },

    thumbnail: {
      type: String,
      required: true,
      validate: {
        validator: (url) => regex.test(url),
        message: 'Не является ссылкой',
      },
    },

    owner: {
      type: ObjectId,
      ref: 'user',
      required: true,
    },

    movieId: {
      type: Number,
      required: true,
    },

    nameRU: {
      type: String,
      required: true,
    },

    nameEN: {
      type: String,
      required: true,
    },
  },
  { versionKey: false },
);

module.exports = model('movie', movieSchema);
