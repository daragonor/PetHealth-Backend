const bcrypt = require('bcryptjs');

const helpers = {};

helpers.secret_key = "secretkey23456"

helpers.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

helpers.matchPassword = async (password, savedPassword) => {
  try {
    const resp = await bcrypt.compare(password, savedPassword);
    return resp
  } catch (e) {
    console.log(e)
  }
};

helpers.verifyToken = (req, res, next) => {
  // Get auth header value
  const token = req.headers['access_token'];
  // Check if bearer is undefined
  if(typeof token !== 'undefined') {
    // Set the token
    req.token = token;
    // Next middleware
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }
};



module.exports = helpers;