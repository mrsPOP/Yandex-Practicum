const router = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  unlikeCard,
} = require('../controllers/cards');
const {
  createCardValid,
  parameterIdValid,
} = require('../utils/validationUtils');

router.get('/', getCards);
router.post('/', createCardValid, createCard);
router.delete('/:cardId', parameterIdValid('cardId'), deleteCard);
router.put('/:cardId/likes', parameterIdValid('cardId'), likeCard);
router.delete('/:cardId/likes', parameterIdValid('cardId'), unlikeCard);

module.exports = router;
