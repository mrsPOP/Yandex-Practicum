import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor ({popupSelector, handleSubmit}) {
    super(popupSelector);
    this._handleFormSubmit = handleSubmit;
    this._popupForm = this._popup.querySelector('.popup__form');
    this._inputList = this._popupForm.querySelectorAll('.popup__input');
  }

  getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.id] = input.value;
    });

    return this._formValues;
  }

  setInputValues(data) {
    this._inputList.forEach(function (input) {
      input.value = data[input.id];
    });
  }

  setEventListeners () {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", evt => this._handleFormSubmit(evt));
  }

  close () {
    super.close();
    this._popupForm.reset();
  }
}
