const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const helpers = {};

helpers.secret_key = "secretkey23456"

function degreesToRadians(degrees){
  return degrees*Math.PI/180;
}


helpers.distance = (locationIni,locationFin) => {
  var earthRadiusKm = 6371;

  var dLat = degreesToRadians(locationFin.latitude-locationIni.latitude);
  var dLon = degreesToRadians(locationFin.longitude-locationIni.longitude);

  lat1 = degreesToRadians(locationIni.latitude);
  lat2 = degreesToRadians(locationFin.latitude);

  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  let distance = earthRadiusKm * c;
  return distance; 
}

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
    jwt.verify(req.token, helpers.secret_key, (err, authData) => {
      if(err) {
        res.sendStatus(403);
      } else {
        next();
      }
  }); 
  } else {
    // Forbidden
    res.sendStatus(403);
  }
};

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
  }
}

helpers.ForEach = asyncForEach;

module.exports = helpers;