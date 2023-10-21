const NotFoundError = require('../errors/notFoundError');
const BadRequestError = require('../errors/badRequestError');
const Forbidden = require('../errors/forbidden');
const Cards = require('../models/card');

const createCard = async (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  try {
    const card = await Cards.create({ name, link, owner });
    res.send(card);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(
        new BadRequestError(
          'Переданы некорректные данные при создании карточки',
        ),
      );
    } else {
      next(err);
    }
  }
};

const deleteCard = async (req, res, next) => {
  const { cardId } = req.params;
  try {
    const card = await Cards.findById(cardId);
    if (!card) {
      throw new NotFoundError('Карточка с указанным _id не найдена');
    }
    const ownerId = card.owner.toString();
    const userId = req.user._id;
    if (ownerId !== userId) {
      throw new Forbidden('Отказано в доступе');
    }
    await card.deleteOne();
    res.send(card);
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError('Переданы некорректные данные'));
    } else {
      next(err);
    }
  }
};

const getCards = async (req, res, next) => {
  try {
    const cards = await Cards.find({});
    res.send(cards);
  } catch (err) {
    next(err);
  }
};

const likeCard = async (req, res, next) => {
  try {
    const card = await Cards.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );
    if (!card) {
      throw new NotFoundError('Передан несуществующий _id карточки');
    }
    res.status(200).send(card);
  } catch (err) {
    if (err.name === 'CastError') {
      next(
        new BadRequestError('Переданы некорректные данные для постановки лайка'),
      );
    } else {
      next(err);
    }
  }
};

const unlikeCard = async (req, res, next) => {
  try {
    const card = await Cards.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    );
    if (!card) {
      throw new NotFoundError('Передан несуществующий _id карточки');
    }
    res.status(200).send(card);
  } catch (err) {
    if (err.name === 'CastError') {
      next(
        new BadRequestError('Переданы некорректные данные для снятия лайка'),
      );
    } else {
      next(err);
    }
  }
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  unlikeCard,
  likeCard,
};
