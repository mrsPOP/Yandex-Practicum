import error from "../images/error.svg";
import ok from "../images/success.svg";

function InfoTooltip({ name, isSuccessInfoTooltipStatus, onClose, isOpen }) {
  return (
    <div className={`popup popup_el_${name}${isOpen ? " popup_opened" : ""}`}>
      <div className={`popup__notification popup__notification_type_form`}>
        <button
          className="popup__close-button"
          aria-label="Закрыть"
          type="button"
          onClick={onClose}
        ></button>
        {
          <img
            src={isSuccessInfoTooltipStatus ? ok : error}
            alt={isSuccessInfoTooltipStatus ? "Успешно" : "Проблема"}
            className={`popup__pic popup__pic_el_${name}`}
          />
        }
        <h2 className={`popup__text popup__text_el_${name}`}>
          {isSuccessInfoTooltipStatus
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."}
        </h2>
      </div>
    </div>
  );
}

export default InfoTooltip;
