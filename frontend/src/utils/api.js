import { API_URL, TOKEN } from "./constants";

class Api {
  constructor(url, token) {
    this._url = url;
    this._token = token;
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
      headers: {
        "authorization": this._token,
      },
    }).then((res) =>
      this._getResponseData(res, "Данные о пользователе не получены"));
  }

  //Изменение данных пользователя
  setUserInfo(data) {
    return fetch(`${this._url}users/me`, {
      method: "PATCH",
      headers: {
        "authorization": this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    })
    .then(res => this._getResponseData(res, "Данные пользователя не изменены"));
  }

  //Обновление аватара
  setUserAvatar(avatarData) {
    return fetch(`${this._url}users/me/avatar`, {
      method: "PATCH",
      headers: {
        "authorization": this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(avatarData)
    })
    .then(res => this._getResponseData(res, "Аватар не обновлен"));
  }

  //Получение карточек с сервера
  getCardList() {
    return fetch(`${this._url}cards`, {
      method: "GET",
      headers: {
        "authorization": this._token,
      },
    }).then((res) =>
      this._getResponseData(res, "Карточки с сервера не пришли")
    );
  }

  //Изменить статус лайка карточки
  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._url}cards/${cardId}/likes`, {
      method: isLiked ? "DELETE" : "PUT",
      headers: {
        "authorization": this._token,
      },
    }).then((res) => this._getResponseData(res, "Статус лайка не изменен"));
  }

  //Удаление карточки
  deleteCard(cardId) {
    return fetch(`${this._url}cards/${cardId}`, {
      method: "DELETE",
      headers: {
        "authorization": this._token,
      }
    })
    .then(res => this._getResponseData(res, "Карточка не удалена"));
  }

  //Добавление новой карточки
addNewCard(newCardData) {
  return fetch(`${this._url}cards`, {
    method: "POST",
    headers: {
      "authorization": this._token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newCardData)
  })
  .then(res => this._getResponseData(res, "Карточка не добавлена"));
}
}

const api = new Api(API_URL, TOKEN);
export default api;
