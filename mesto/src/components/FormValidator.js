export class FormValidator{
constructor (settings, formElement) {
  this._inputSelector = settings.inputSelector;
  this._submitButtonSelector = settings.submitButtonSelector;
  this._inactiveButtonClass = settings.inactiveButtonClass;
  this._inputErrorClass = settings.inputErrorClas;
  this._formElement = formElement;
  this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
}

resetValidation () {
  this._toggleButtonState();
  this._inputList.forEach((inputElement) => {
    this._hideInputError(inputElement)
  });
}

_showInputError (inputElement, errorMessage) {
  const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(this._inputErrorClass);
  errorElement.textContent = errorMessage;
}

_hideInputError (inputElement) {
  const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(this._inputErrorClass);
  errorElement.textContent = '';
}

_checkInputValidity (inputElement) {
  if (!inputElement.validity.valid) {
    this._showInputError(inputElement, inputElement.validationMessage);
  } else {
    this._hideInputError(inputElement);
  }
}

_setEventListeners () {
  this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
  this._toggleButtonState();
  this._inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      this._checkInputValidity(inputElement);
      this._toggleButtonState();
    });
  });
}

enableValidation () {
  this._setEventListeners();
}

_hasInvalidInput () {
  return this._inputList.some((InputElement) => {
    return !InputElement.validity.valid;
  });
}

_toggleButtonState () {
  if (this._hasInvalidInput()) {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.setAttribute('disabled', true);
  } else {
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.removeAttribute('disabled');
  }
}
}
