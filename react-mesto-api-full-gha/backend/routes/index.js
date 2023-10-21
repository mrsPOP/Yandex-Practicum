const router = require('express').Router();
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const NotFoundError = require('../errors/notFoundError');
const { login, createUser } = require('../controllers/users');
const { registerValid, loginValid } = require('../utils/validationUtils');
const auth = require('../middlewares/auth');

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
router.use('/cards', cardsRouter);

router.use((req, res, next) => {
  next(new NotFoundError('Не найдено'));
});

module.exports = router;
