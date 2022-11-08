function InfoTooltip(props) {
  const popupClassName = `popup popup_type_alert ${props.isOpen ? "popup_opened" : null}`;

  return (
    <div className={popupClassName}>
      <div className="popup__container">
        <img src={props.icon} alt="" className="popup__icon" />
        <h2 className="popup__title popup__title_align_center">{props.text}</h2>
        <button
          className="popup__close"
          type="button"
          onClick={props.onClose}
        ></button>
      </div>
    </div>
  );
}

export default InfoTooltip;