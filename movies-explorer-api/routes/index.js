const router = require('express').Router();
const usersRouter = require('./user');
const moviesRouter = require('./movie');
const auth = require('../middlewares/auth');
const { login, createUser } = require('../controllers/users');
const NotFoundError = require('../errors/notFoundError');
const {
  loginValid,
  registerValid,
} = require('../utils/validationUtils');

router.post(
  '/signin',
  loginValid,
  login,
);

router.post(
  '/signup',
  registerValid,
  createUser,
);

router.use(auth);
router.use('/users', usersRouter);
router.use('/movies', moviesRouter);

router.use((req, res, next) => next(new NotFoundError('Страницы не существует')));

module.exports = router;
