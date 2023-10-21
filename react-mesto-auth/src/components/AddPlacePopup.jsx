import PopupWithForm from "./PopupWithForm";
import { useEffect, useState } from "react";

const AddPlacePopup = ({ isOpen, onClose, onSubmit }) => {
  const [cardName, setCardName] = useState("");
  const [cardLink, setCardLink] = useState("");

  useEffect(() => {
    setCardName("");
    setCardLink("");
  }, [isOpen]);
  return (
    <PopupWithForm
      title={"Новое место"}
      name={"add-new-place-form"}
      buttonName={"Создать"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={(evt) => {
        evt.preventDefault();
        onSubmit({ name: cardName, link: cardLink });
      }}
    >
      <input
        id="new-place-name-input"
        className="popup__input popup__input_card-name"
        type="text"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        value={cardName}
        onChange={(evt) => {
          setCardName(evt.target.value);
        }}
        required
      />
      <span className="new-place-name-input-error popup__input-error"></span>
      <input
        id="new-place-link-input"
        className="popup__input popup__input_card-link"
        type="url"
        placeholder="Ссылка на картинку"
        value={cardLink}
        onChange={(evt) => {
          setCardLink(evt.target.value);
        }}
        required
      />
      <span className="new-place-link-input-error popup__input-error"></span>
    </PopupWithForm>
  );
};

export default AddPlacePopup;
