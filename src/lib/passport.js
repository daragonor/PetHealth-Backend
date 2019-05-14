const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const connection = require('../database');
const helpers = require('./helpers');

passport.use('local.signup', new LocalStrategy({
  usernameField: 'Username',
  passwordField: 'Password',
  passReqToCallback: true
}, async (req, Username, Password, done) => {
  const { Mail, Photo, Userable_type } = req.body;
  let User = {
    Username,
    Password,
    Mail,
    Photo,
    Userable_type
  };
  User.Password = await helpers.encryptPassword(Password);
  console.log(User.Password.length)
  console.log(User.Password)
  // Saving in the Database
  const result = await connection.query('INSERT INTO User SET ? ', User);

}));

