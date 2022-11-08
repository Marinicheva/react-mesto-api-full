function ImagePopup({ card, onClose }) {
  const popupClassName = `popup popup_type_fullscreen-img ${card ? "popup_opened" : ""}`;

  return (
    <div className={popupClassName}>
      <div className="popup__fullscreen-container">
        <img
          src={card ? card.link : "#"}
          alt={card ? card.name : ""}
          className="popup__img-fullscreen"
        />
        <h2 className="popup__fullscreen-caption">{card ? card.name : ""}</h2>
        <button
          className="popup__close"
          type="button"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

export default ImagePopup;
