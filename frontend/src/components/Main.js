import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Card from "./Card";

function Main({
  cards,
  onCardClick,
  onAddPlace,
  onEditAvatar,
  onEditProfile,
  onCardLike,
  onCardDelete,
}) {

  const currentUser = useContext(CurrentUserContext);

  const cardItems = cards
    .map((item) => {
      return (
        <Card
          key={item._id}
          card={item}
          onCardClick={onCardClick}
          onCardLike={onCardLike}
          onCardDelete={onCardDelete}
        />
      )
    }).reverse();

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__data">
          <div className="profile__avatar-container">
            <img
              src={currentUser.avatar}
              alt="Фото автора страницы"
              className="profile__avatar"
            />
            <button
              className="profile__edit-avatar-btn"
              type="button"
              onClick={onEditAvatar}
            ></button>
          </div>
          <h1 className="profile__name">{currentUser.name}</h1>
          <button
            className="profile__edit-btn"
            aria-label="Изменить данные профиля"
            type="button"
            onClick={onEditProfile}
          ></button>
          <p className="profile__about">{currentUser.about}</p>
        </div>
        <button
          className="profile__add-btn"
          aria-label="Добавить новое фото"
          type="button"
          onClick={onAddPlace}
        ></button>
      </section>

      <section className="gallery" aria-label="Галерея фотографий пользователя">
        <ul className="gallery__list">{cardItems}</ul>
      </section>
    </main>
  );
}

export default Main;
