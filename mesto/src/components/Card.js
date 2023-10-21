export class Card {
  constructor(data, myId, cardTemplate, functions) {
    this._imageLink = data.link;
    this._imageCaption = data.name;
    this._imageLikes = data.likes.length;
    this._cardTemplate = cardTemplate;
    this._id = data._id;
    this._myCard = (data.owner._id === myId);
    this._likedByMe = data.likes.find((user) => user._id === myId);
    this._openCard = functions.openCard;
    this._like = functions.like;
    this._unlike = functions.unlike;
    this._removeCard = functions.deleteCard;
  }

  _getCardTemplate () {
    const cardElement = document
    .querySelector(this._cardTemplate)
    .content
    .querySelector('.elements-list__item')
    .cloneNode(true);

    return cardElement;
  }

  generateCard () {
    this._element = this._getCardTemplate();
    this._cardImage = this._element.querySelector(".element__image");
    this._likeButton = this._element.querySelector(".element__like");
    this._likesNumber = this._element.querySelector(".element__like-number");
    this._removeButton = this._element.querySelector(".element__remove-button");
    this._setEventListeners();
    this._cardImage.src = this._imageLink;
    this._cardImage.alt = this._imageCaption;
    this._element.querySelector(".element__description").textContent = this._imageCaption;
    this._element.querySelector(".element__like-number").textContent = this._imageLikes;
    this._isLikedByMe();
    if (!this._myCard) {
      this._removeButton.remove();
    }

    return this._element;
  }

  _isLikedByMe () {
    if (this._likedByMe) {
      this._likeButton.classList.add('element__like_active');
    }
  }

  removeCard () {
    this._element.remove();
  }

  toggleLike () {
    this._likeButton.classList.toggle("element__like_active");
  }

  setLikes(res) {
    this._likesNumber.textContent = res.likes.length;
 }

  _setEventListeners () {
    this._removeButton.addEventListener("click", () => {
      this._removeCard(this._id);
    });

    this._cardImage.addEventListener("click", () => this._openCard(this._imageCaption, this._imageLink));

    this._likeButton.addEventListener("click", () => {
      if (this._likeButton.classList.contains('element__like_active')) {
        this._unlike(this._id)
      } else {
        this._like(this._id)
      }
    });
  }
}

