const { Schema, model } = require('mongoose');
const { isURL } = require('validator');

const cardSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    link: {
      type: String,
      required: true,
      validate: {
        validator: (v) => isURL(v, { required_protocol: true }),
        message: "Поле 'link' не соответствует формату URL",
      },
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    likes: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'user',
        },
      ],
      default: [],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false },
);

module.exports = model('card', cardSchema);
