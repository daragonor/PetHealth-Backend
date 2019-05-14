const express = require('express');
const passport = require('passport');

// Intializations
const app = express();
require('./lib/passport');

// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());


// Routes
app.use('/api',require('./routes/home-route'));
app.use('/api',require('./routes/appt-route'));
app.use('/api',require('./routes/auth-route'));


// Starting the server
app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
});