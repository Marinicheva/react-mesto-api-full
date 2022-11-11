# Учебный проект: Mesto (фронт + бэк)

### Описание проекта
Mesto - это сервис, с помощью которого можно делиться с другими пользователями Интернета своими фотографиями. Так же буквально в двух словах рассказать о себе. Другие пользователи, в свою очередь, могут оценивать Ваши фотографии, поставив им сердечко. 

В данном проекте реализованы следующие возможности:
 * авторизация;
 * регистрация;
 * добавление/удаление карточки;
 * добавление/удаление лайка на карточку;
 * возможность частиного редактирования данных пользователя (имя, описание, аватар).

В реализации бэкенд части проекта предусмотрено: 
- запуск сервера;
- установка соединения с NoSQL БД - MongoDB;
- возможность регистрации и авторизации пользователя;
- создание основных маршрутов;
- защита части маршрутов от неавторизованных пользователей;
- валидация данных запроса с помощью Joi;
- обработка запросов по маршрутам;
- описание схем и моделей документов в БД;
- централизованная обработка возможных ошибок;
- защита приложения от широкоизвестных веб-уязвимостей и DDoS;
- логирование запросов и ошибок на сервере.

Проект развернут на облачном сервера, посмотреть можно [**тут**](https://marinich.students.nomoredomains.icu/)

Адреса проекта:

IP 158.160.39.51

Frontend https://marinich.students.nomoredomains.icu

Backend https://api.marinich.students.nomoredomains.icu


В работе над данным проектом были использованы следующие методы и технологии:
 
 _В части фронтенда:_
* HTML
* CSS
* Семантическая верстка
* Адаптивная верстка
* Flexbox
* Grid layout
* БЭМ (Nested)
* React (приложение построенно с использованием функциональных компонентов, хуков)
* React Router
* Fetch API

_В части бэкенда:_
* Node.js
* Express
* MongoDB
* Mongoose
* Celebrate & Joi
* Express-rate-limit
* Helmet
* Winston + express-winston
