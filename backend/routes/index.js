const router = require('express').Router();
const { celebrate } = require('celebrate');

const userRouter = require('./users');
const cardRouter = require('./cards');

const { unloginedUserSchema } = require('../utils/userValidationSchemas');
const { auth } = require('../middlewares/auth');
const { createUser, login, logout } = require('../controllers/users');
const NotFoundError = require('../errors/NotFoundError');

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.post('/signup', celebrate(unloginedUserSchema), createUser);
router.post('/signin', celebrate(unloginedUserSchema), login);

router.use(auth);

router.use('/users', userRouter);
router.use('/cards', cardRouter);
router.get('/signout', logout);

router.use('*', (req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

module.exports = router;
