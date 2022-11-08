import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLikedCard = card.likes.some((item) => item._id === currentUser._id);

  const cardDeleteButtonClassName = `gallery__delete-btn ${
    isOwn ? "" : "gallery__delete-btn_hide"
  }`;

  const cardLikeButtonClassName = `gallery__like-btn ${
    isLikedCard ? "gallery__like-btn_active" : ""
  }`;

  const handleCardClick = () => {
    onCardClick(card);
  };

  const handleLikeButtonClick = () => {
    onCardLike(card);
  };

  const handleDeleteButtonClick = () => {
    onCardDelete(card);
  };

  return (
    <li className="gallery__item">
      <img
        src={card.link}
        alt={card.name}
        className="gallery__img"
        onClick={handleCardClick}
      />
      <div className="gallery__item-footer">
        <h2 className="gallery__img-caption">{card.name}</h2>
        <div className="gallery__like-container">
          <button
            className={cardLikeButtonClassName}
            aria-label="Нравится"
            type="button"
            onClick={handleLikeButtonClick}
          ></button>
          <p className="gallery__like-counter">
            {card.likes.length > 0 ? card.likes.length : null}
          </p>
        </div>
      </div>
      <button
        className={cardDeleteButtonClassName}
        aria-label="Удалить карточку"
        type="button"
        onClick={handleDeleteButtonClick}
      ></button>
    </li>
  );
}

export default Card;
