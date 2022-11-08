import { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

const defaultState = { name: "", link: "" };

function AddPlacePopup({
  isOpen,
  onClose,
  onAddNewCard,
  isRenderLoading,
  renderLoading,
  renderLoadingButtonText,
}) {
 
  const [newCard, setNewCard] = useState(defaultState);

  useEffect(() => {
    setNewCard(defaultState);
  }, [isOpen]);

  const handleSubmit = (evt) => {
    evt.preventDefault();

    renderLoading();
    onAddNewCard(newCard);

    setNewCard(defaultState);
  };

  const handleChangeInput = (evt) => {
    setNewCard((newCard) => ({
      ...newCard,
      [evt.target.name]: evt.target.value,
    }));
  };

  return (
    <PopupWithForm
      name="add-place"
      title="Новое место"
      buttonText="Добавить"
      onClose={onClose}
      isOpen={isOpen}
      isRenderLoading={isRenderLoading}
      renderLoadingButtonText={renderLoadingButtonText}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input-place-name"
        type="text"
        name="name"
        id="place-name"
        placeholder="Название"
        value={newCard.name}
        minLength="2"
        maxLength="30"
        required
        onChange={handleChangeInput}
      />
      <span className="popup__input-error place-name-input-error"></span>
      <input
        className="popup__input popup__input-place-link"
        type="url"
        name="link"
        id="place-link"
        placeholder="Ссылка на картинку"
        value={newCard.link}
        required
        onChange={handleChangeInput}
      />
      <span className="popup__input-error place-link-input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
