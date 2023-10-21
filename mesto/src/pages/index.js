import "./index.css";
import Api from "../components/Api";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupAcceptRemoving } from "../components/PopupAcceptRemoving";
import { UserInfo } from "../components/UserInfo.js";
import {
  imagePopupPhoto,
  imagePopupDescription,
  editButton,
  addButton,
  profileForm,
  profileFormSubmitButton,
  cardForm,
  cardFormSubmitButton,
  deleteSubmitButton,
  editAvatarForm,
  editAvatarButton,
  editAvatarSubmitButton,
  settings,
} from "../utils/constants.js";

// API

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-61",
  headers: {
    authorization: "e29e9321-d795-43e0-80af-c0c8449350e2",
    "Content-Type": "application/json",
  },
});

Promise.all([api.getUserInfo(), api.getInitialCards()])
.then(([userInfo, initialCards]) => {
  profileInfo.setUserInfo(userInfo);
  cardList.renderItems(initialCards.reverse());
})
.catch(() => console.log);

// TO DISPLAY CARDS FROM THE LIST "initialCards"

const cardList = new Section(
    (item) => {
      const cardElement = createCard(item);
      cardList.addItem(cardElement);
    },
  ".elements-list"
);

// POPUPS DECLARATION

const popupOpenCard = new PopupWithImage("#imagePopup");
popupOpenCard.setEventListeners();

const popupNewCard = new PopupWithForm({popupSelector: "#cardPopup", handleSubmit: (evt) => {
  evt.preventDefault();
  const {'new-place-name-input': name, 'new-place-link-input': link} = popupNewCard.getInputValues();
  cardFormSubmitButton.textContent = 'Создание...';
  api.addNewCard({name, link})
    .then((data) => {
      cardList.addItem(
        createCard(data)
      );
      popupNewCard.close();
    })
    .catch(() => console.log)
    .finally(() => {
      cardFormSubmitButton.textContent = 'Создать';
    })


}});

popupNewCard.setEventListeners();

const popupEditProfile = new PopupWithForm({popupSelector: "#profilePopup",
  handleSubmit: (evt) => {
    evt.preventDefault();
    const {'profile-name-input': name, 'profile-description-input': about} = popupEditProfile.getInputValues();
    profileFormSubmitButton.textContent = "Сохранение...";
    api.editProfileInfo({name, about})
      .then((data) => {
        profileInfo.setUserNameAbout(data);
        popupEditProfile.close();
      })
      .catch(() => console.log)
      .finally(() => {
        profileFormSubmitButton.textContent = 'Сохранить';
      })
}});

popupEditProfile.setEventListeners();

const popupAcceptRemoving = new PopupAcceptRemoving({popupSelector: '#deleteCardPopup'});
popupAcceptRemoving.setEventListeners();

const popupEditProfilePhoto = new PopupWithForm({popupSelector: '#editProfilePhoto',
  handleSubmit: (evt) => {
    evt.preventDefault();
    const {'new-photo-link-input': avatar} = popupEditProfilePhoto.getInputValues();
    editAvatarSubmitButton.textContent = 'Сохранение...';
    api.changeAvatar(avatar)
      .then((data) => {
        profileInfo.changeAvatar(data);
        popupEditProfilePhoto.close();
      })
      .catch(() => console.log)
      .finally(() => {
        editAvatarSubmitButton.textContent = 'Сохранить';
      });
  }
});

popupEditProfilePhoto.setEventListeners();

// TO CREATE A NEW CARD

addButton.addEventListener("click", function () {
  popupNewCard.open();
  newCardValidation.resetValidation();
});

function createCard(data) {
  const card = new Card(data, profileInfo.getUserId(), "#card", {openCard,
    like: (cardId) => {
      api.like(cardId)
        .then((res) => {
          card.toggleLike();
          card.setLikes(res);
        })
        .catch(() => console.log);
    },
    unlike: (cardId) => {
      api.unlike(cardId)
        .then((res) => {
          card.toggleLike();
          card.setLikes(res);
        })
        .catch(() => console.log);
    },
    deleteCard: (cardId) => {
      popupAcceptRemoving.open();
      popupAcceptRemoving.delete(() => {

        deleteSubmitButton.textContent = 'Удаление...';
        api.deleteCard(cardId)
          .then(() => {
            card.removeCard();
            popupAcceptRemoving.close();
          })
          .catch(() => console.log)
          .finally(() => {deleteSubmitButton.textContent = 'Да'});
      });
    }
  });

  return card.generateCard();
}

// TO EDIT PROFILE INFO

const profileInfo = new UserInfo({
  profileName: ".profile__name",
  profileDescription: ".profile__description",
  avatarPicture: ".profile__avatar"
});

editAvatarButton.addEventListener("click", function (evt) {
  evt.preventDefault();
  popupEditProfilePhoto.open();
  editAvatarValidation.resetValidation();
});

editButton.addEventListener("click", function () {
  popupEditProfile.open();
  profileValidation.resetValidation();
  popupEditProfile.setInputValues(profileInfo.getUserInfo());
});

// TO SEE CARD-INFO CLOSER

function openCard(name, link) {
  popupOpenCard.open(name, link, imagePopupPhoto, imagePopupDescription);
}

// TO ENABLE VALIDATION

const profileValidation = new FormValidator(settings, profileForm);
const newCardValidation = new FormValidator(settings, cardForm);
const editAvatarValidation = new FormValidator(settings, editAvatarForm);

profileValidation.enableValidation();
newCardValidation.enableValidation();
editAvatarValidation.enableValidation();


