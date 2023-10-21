const PopupWithForm = ({ title, name, buttonName, isOpen, onClose, children, onSubmit }) => {
  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button
					onClick={onClose}
          className="popup__close-button"
          type="button"
          aria-label="закрыть"
        ></button>
        <h2 className="popup__header">{title}</h2>
        <form className="popup__form" name={name} onSubmit={onSubmit}>
          {children}
          <button className="popup__button" type="submit">
          {buttonName || 'Сохранить'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PopupWithForm;
