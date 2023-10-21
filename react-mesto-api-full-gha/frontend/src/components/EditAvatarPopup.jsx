import PopupWithForm from "./PopupWithForm";
import { useRef, useEffect } from "react";

const EditAvatarPopup = ({ isOpen, onClose, onUpdateAvatar }) => {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.value = "";
  }, [isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar(inputRef.current.value);
  }
  return (
    <PopupWithForm
      title={"Обновить аватар"}
      name={"edit-profile-photo"}
      buttonName={"Создать"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="new-photo-link-input"
        ref={inputRef}
        className="popup__input"
        type="url"
        placeholder="Ссылка на картинку"
        required
      />
      <span className="new-photo-link-input-error popup__input-error"></span>
    </PopupWithForm>
  );
};

export default EditAvatarPopup;
