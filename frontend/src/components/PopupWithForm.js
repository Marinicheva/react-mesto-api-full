function PopupWithForm(
  { 
    name, 
    title, 
    children, 
    buttonText, 
    isOpen, 
    isRenderLoading, 
    renderLoadingButtonText, 
    onClose, 
    onSubmit
  }) {

  const popupClassName = `popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`;
  const submitButtonClassName = `popup__btn ${isRenderLoading ? 'popup__btn_inactive' : ''}`

  return (
    <div className={popupClassName}>
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <form
          className={`popup__form popup__form_type_${name}`}
          action="#"
          method="POST"
          name={`${name}-form`}
          onSubmit={onSubmit}
        >
          <fieldset className="popup__fielset">
            {children}
          </fieldset>

          <button className={submitButtonClassName} type="submit" disabled={isRenderLoading}>
            {isRenderLoading ? renderLoadingButtonText : buttonText}
          </button>
        </form>
        <button
          className="popup__close"
          type="button"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

export default PopupWithForm;
