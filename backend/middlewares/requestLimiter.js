const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000, // TODO:Почему-то 100 запросов быстро кончились...
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Слишком много запросов, пожалуйста, повторите попытку позже.' },
});

module.exports = limiter;
