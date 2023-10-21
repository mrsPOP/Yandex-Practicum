const ImagePopup = ({ card, onClose, isOpen }) => {
  return (
    <div
      id="imagePopup"
      className={`popup popup_opacity_total ${isOpen ? "popup_opened" : ""}`}
    >
      <div className="popup__container popup__container_background_transparent">
        <button
          onClick={onClose}
          className="popup__close-button"
          type="button"
          aria-label="закрыть"
        ></button>
        <div className="popup__card-info">
          <img src={card.link} alt={card.name} className="popup__card-picture" />
          <p className="popup__card-description">{card.name}</p>
        </div>
      </div>
    </div>
  );
};

export default ImagePopup;
