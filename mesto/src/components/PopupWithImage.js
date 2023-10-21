import {Popup} from './Popup.js';

export class PopupWithImage extends Popup {
  open (name, link, imagePopupPhoto, imagePopupDescription) {
    super.open();
    imagePopupPhoto.src = link;
    imagePopupPhoto.alt = name;
    imagePopupDescription.textContent = name;
  }
}
