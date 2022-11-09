//Удалила токен, добавила credentials, использую URL из констант
import { API_URL } from './constants';

const request = ({ url, method = "POST", data }) => {
  const headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
  };

  // if (token) {
  //   headers["Authorization"] = `Bearer ${token}`;
  // }

  const config = {
    method,
    headers,
    credentials: 'include',
  };

  if (data) {
    config.body = JSON.stringify(data);
  }

  return fetch(`${API_URL}${url}`, config).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res.status)
    }
  });
};

export const registration = (data) => {
  return request({
    url: "signup",
    data,
  });
};

export const authorization = (data) => {
  return request({
    url: "signin",
    data,
  });
};

export const getContent = () => {
  return request({
    url: "users/me",
    method: "GET",
  });
};
