import { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({
  isOpen,
  onClose,
  onUpdateAvatar,
  isRenderLoading,
  renderLoading,
  renderLoadingButtonText,
}) {
  const avatarInput = useRef();

  useEffect(() => {
    avatarInput.current.value = "";
  }, [isOpen, avatarInput])

  const handleSubmit = (evt) => {
    evt.preventDefault();
    renderLoading();

    onUpdateAvatar({
      avatar: avatarInput.current.value,
    });
  };

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      buttonText="Обновить"
      onClose={onClose}
      isOpen={isOpen}
      isRenderLoading={isRenderLoading}
      renderLoadingButtonText={renderLoadingButtonText}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input-avatar-link"
        type="url"
        name="avatar"
        ref={avatarInput}
        id="avatar-link"
        placeholder="Ссылка на аватар"
        required
      />
      <span className="popup__input-error avatar-link-input-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
