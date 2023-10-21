const router = require('express').Router();
const {
  getUserMovies,
  createMovie,
  deleteMovieById,
} = require('../controllers/movies');
const {
  movieValid,
  deleteMovieValid,
} = require('../utils/validationUtils');

router.get('/', getUserMovies);
router.post('/', movieValid, createMovie);
router.delete('/:_id', deleteMovieValid, deleteMovieById);

module.exports = router;
