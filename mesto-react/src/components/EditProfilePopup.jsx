import PopupWithForm from "./PopupWithForm";
import { useEffect, useContext, useState } from "react";
import { CurrentUserContext as CurrentUserContext } from "../contexts/CurrentUserContext";

const EditProfilePopup = ({ onClose, isOpen, onUpdateUser }) => {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setName(currentUser["name"]);
    setDescription(currentUser["about"]);
  }, [currentUser, isOpen]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  };
  return (
    <PopupWithForm
      title={"Редактировать профиль"}
      name={"edit-form"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="profile-name-input"
        className="popup__input popup__input_el_name"
        type="text"
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        value={name}
        onChange={(evt) => {
          setName(evt.target.value);
        }}
        required
      />
      <span className="profile-name-input-error popup__input-error"></span>
      <input
        id="profile-description-input"
        className="popup__input popup__input_el_description"
        type="text"
        placeholder="О себе"
        minLength="2"
        maxLength="200"
        value={description}
        onChange={(evt) => {
          setDescription(evt.target.value);
        }}
        required
      />
      <span className="profile-description-input-error popup__input-error"></span>
    </PopupWithForm>
  );
};

export default EditProfilePopup;
