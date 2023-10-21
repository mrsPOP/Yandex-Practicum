import { Popup } from "./Popup.js";

export class PopupAcceptRemoving extends Popup {
  constructor ({popupSelector}) {
    super(popupSelector);
    this._handleFormSubmit = this._popup.querySelector('.popup__form');
  }

  delete (deleteFunction) {
    this._delete = deleteFunction;
  }

  setEventListeners() {
    super.setEventListeners();
    this._handleFormSubmit.addEventListener('click', (evt) => {evt.preventDefault(); this._delete()});
  }
}
