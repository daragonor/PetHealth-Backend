const express = require('express');

// Intializations
const app = express();

// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(express.json());
app.use(express.urlencoded());

// Routes
app.use('/api',require('./routes/home-route'));
app.use('/api',require('./routes/appt-route'));
app.use('/api',require('./routes/auth-route'));
app.use('/api',require('./routes/pets-route'));


// Starting the server
app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
});