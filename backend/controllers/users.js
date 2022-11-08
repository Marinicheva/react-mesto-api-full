const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

const User = require('../models/user');

const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');

const createUser = (req, res, next) => {
  const newUser = {
    email: req.body.email,
    name: req.body.name,
    about: req.body.about,
    avatar: req.body.avatar,
  };

  bcrypt.hash(req.body.password, 10)
  // Запрос к БД на создание user
    .then((hash) => User.create({ ...newUser, password: hash }))
    // Отправляем в ответ данные о созданном user
    .then((user) => {
      const resData = {
        email: user.email,
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        _id: user._id,
      };
      res.status(201).send(resData);
    })
    .catch((err) => {
      // Данные пользователя не соответствуют схеме
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError('Переданы некорректные или неполные данные'));
      } else if (err.code === 11000) {
        // Такой email уже есть в БД
        next(new ConflictError('Пользователь с таким e-mail уже существует'));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res
        .cookie('token', token, {
          maxAge: 3600000,
          httpOnly: true,
        })
        .send({ message: 'Авторизация прошла успешно' });
    })
    .catch((err) => {
      next(err);
    });
};

const getUsers = (req, res, next) => User.find({})
  .then((users) => {
    res.send(users);
  })
  .catch((err) => {
    next(err);
  });

const getUserInfo = (req, res, next) => {
  const userId = req.user._id;

  User.findById(userId)
    .orFail(new NotFoundError(`Пользователь с id ${userId} не найден`))
    .then((user) => res.send(user))
    .catch(next);
};

const getUserById = (req, res, next) => {
  const { userId } = req.params;

  return User.findById(userId)
    .orFail(new NotFoundError(`Пользователь с id ${userId} не найден`))
    .then((user) => res.send({ data: user }))
    .catch(next);
};

const updateUser = (req, res, next) => {
  const userId = req.user._id;
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    userId,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  ).orFail(new NotFoundError(`Пользователь с id ${userId} не найден`))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        // Переданные новые данные пользователя не соответвуют схеме
        next(new BadRequestError('Переданные некорректные данные пользователя'));
      } else if (err instanceof mongoose.Error.CastError) {
        // Некорретный id пользователя
        next(new BadRequestError('Некорректный id пользователя'));
      } else {
        next(err);
      }
    });
};

const updateAvatar = (req, res, next) => {
  const userId = req.user._id;
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    userId,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  ).orFail(new NotFoundError(`Пользователь с id ${userId} не найден`))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        // Переданные данные аватара не соответсвуют схеме
        next(new BadRequestError('Переданы некорректные данные аватара пользователя'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  createUser,
  login,
  getUsers,
  getUserInfo,
  getUserById,
  updateUser,
  updateAvatar,
};
