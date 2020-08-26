require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  try {
    jwtToken = req.header('Authorization');
    if (!jwtToken) {
      return res.status(403).json('Not Authorized!');
    }

    const payload = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
    
    req.user = payload.user;

    next();

  } catch (err) {
    console.error(err.mesage);
    res.status(403).json('Not Authorized!');
  }
};
