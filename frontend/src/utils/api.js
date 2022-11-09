// Удалила везде токен, добавила credentials
import { API_URL } from "./constants";

class Api {
  constructor(url) {
    this._url = url;
  }

  //Обработка ответа сервера
  _getResponseData(res, errorMessage) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}.${errorMessage}`);
    }
    return res.json();
  }

  //Получение данных о пользователе
  getUserInfo() {
    return fetch(`${this._url}users/me`, {
      method: "GET",
      credentials: 'include',
    }).then((res) =>
      this._getResponseData(res, "Данные о пользователе не получены"));
  }

  //Изменение данных пользователя
  setUserInfo(data) {
    return fetch(`${this._url}users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',
      body: JSON.stringify(data)
    })
    .then(res => this._getResponseData(res, "Данные пользователя не изменены"));
  }

  //Обновление аватара
  setUserAvatar(avatarData) {
    return fetch(`${this._url}users/me/avatar`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',
      body: JSON.stringify(avatarData)
    })
    .then(res => this._getResponseData(res, "Аватар не обновлен"));
  }

  //Получение карточек с сервера
  getCardList() {
    return fetch(`${this._url}cards`, {
      method: "GET",
      credentials: 'include',
    }).then((res) =>
      this._getResponseData(res, "Карточки с сервера не пришли")
    );
  }

  //Изменить статус лайка карточки
  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._url}cards/${cardId}/likes`, {
      method: isLiked ? "DELETE" : "PUT",
      credentials: 'include',
    }).then((res) => this._getResponseData(res, "Статус лайка не изменен"));
  }

  //Удаление карточки
  deleteCard(cardId) {
    return fetch(`${this._url}cards/${cardId}`, {
      method: "DELETE",
      credentials: 'include',
    })
    .then(res => this._getResponseData(res, "Карточка не удалена"));
  }

  //Добавление новой карточки
addNewCard(newCardData) {
  return fetch(`${this._url}cards`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: 'include',
    body: JSON.stringify(newCardData)
  })
  .then(res => this._getResponseData(res, "Карточка не добавлена"));
}
}

const api = new Api(API_URL);
export default api;
