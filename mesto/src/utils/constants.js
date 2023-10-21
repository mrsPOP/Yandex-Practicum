const imagePopupPhoto = document.querySelector(".popup__card-picture");
const imagePopupDescription = document.querySelector(".popup__card-description");

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

const profileForm = document.forms["edit-form"];
const profileFormSubmitButton = profileForm.querySelector(".popup__button");
const cardForm = document.forms["add-new-place-form"];
const cardFormSubmitButton = cardForm.querySelector(".popup__button");
const editAvatarForm = document.forms["edit-profile-photo"];
const editAvatarSubmitButton = editAvatarForm.querySelector(".popup__button");
const editAvatarButton = document.querySelector(".profile__edit-photo-button");
const deleteSubmitButton = document.forms["delete-card"].querySelector(".popup__button");

const settings = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
};

export {
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
};
