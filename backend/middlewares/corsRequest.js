// const { allowedCors, DEFAULT_ALLOWED_METHODS } = require('../utils/constants');
const { DEFAULT_ALLOWED_METHODS } = require('../utils/constants');

const corsRequest = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;

  const requestHeaders = req.headers['access-control-request-headers'];

  console.log(origin);

  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', true);

  // if (allowedCors.includes(origin)) {
  //   res.header('Access-Control-Allow-Origin', '*');
  //   res.header('Access-Control-Allow-Credentials', true);
  // }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  return next();
};

module.exports = corsRequest;
