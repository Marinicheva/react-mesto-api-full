import { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({
  isOpen,
  onClose,
  onUpdateUser,
  isRenderLoading,
  renderLoading,
  renderLoadingButtonText,
}) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (currentUser.name && currentUser.about) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser]);

  const handleChangeName = (evt) => {
    setName(evt.target.value);
  };

  const handleChangeDescription = (evt) => {
    setDescription(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    renderLoading();
    onUpdateUser({ name, about: description });
  };

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      buttonText="Cохранить"
      isOpen={isOpen}
      isRenderLoading={isRenderLoading}
      renderLoadingButtonText={renderLoadingButtonText}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input-name"
        type="text"
        name="name"
        id="user-name"
        value={name}
        placeholder="Ваше имя"
        minLength="2"
        maxLength="40"
        required
        onChange={handleChangeName}
      />
      <span className="popup__input-error user-name-input-error"></span>
      <input
        className="popup__input popup__input-about"
        type="text"
        name="about"
        id="user-about"
        value={description}
        placeholder="Пару слов о Вас"
        minLength="2"
        maxLength="200"
        required
        onChange={handleChangeDescription}
      />
      <span className="popup__input-error user-about-input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
