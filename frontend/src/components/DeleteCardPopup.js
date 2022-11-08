import PopupWithForm from "./PopupWithForm";

function DeleteCardPopup({
  isOpen,
  onClose,
  onDeleteCard,
  isRenderLoading,
  renderLoading,
}) {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    renderLoading();
    onDeleteCard();
  };

  return (
    <PopupWithForm
      name="delete-card"
      title="Вы уверены?"
      buttonText="Удалить"
      isOpen={isOpen}
      onClose={onClose}
      isRenderLoading={isRenderLoading}
      renderLoadingButtonText={"Удаление..."}
      onSubmit={handleSubmit}
    />
  );
}

export default DeleteCardPopup;
