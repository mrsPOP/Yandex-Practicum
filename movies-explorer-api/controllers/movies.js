const NotFoundError = require('../errors/notFoundError');
const BadRequestError = require('../errors/badRequestError');
const Forbidden = require('../errors/forbidden');
const Movie = require('../models/movie');

// eslint-disable-next-line consistent-return
const getUserMovies = async (req, res, next) => {
  const { _id } = req.user;
  try {
    const movies = await Movie.find({ owner: _id }).populate('owner', '_id');
    if (movies) return res.send(movies);
    throw new NotFoundError('Фильмы не найдены');
  } catch (err) {
    next(err);
  }
};

const createMovie = async (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  const { _id } = req.user;
  try {
    const movie = await Movie.create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      nameRU,
      nameEN,
      thumbnail,
      owner: _id,
      movieId,
    });
    res.send(movie);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError(err));
    } else {
      next(err);
    }
  }
};

const deleteMovieById = async (req, res, next) => {
  const { _id } = req.params;
  try {
    const movie = await Movie.findById(_id);
    if (!movie) {
      throw new NotFoundError('Фильм с указанным _id не найден');
    }
    const ownerId = movie.owner.toString();
    const userId = req.user._id;
    if (ownerId !== userId) {
      throw new Forbidden('Отказано в доступе');
    }
    await movie.deleteOne();
    res.send(movie);
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError('Переданы некорректные данные'));
    } else {
      next(err);
    }
  }
};

module.exports = {
  getUserMovies,
  createMovie,
  deleteMovieById,
};
