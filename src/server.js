const express = require('express');

// Intializations
const app = express();

// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(express.json());

// Routes
app.use('/api',require('./routes/home-route'));
app.use('/api',require('./routes/appt-route'));
app.use('/api',require('./routes/auth-route'));
app.use('/api',require('./routes/pets-route'));
app.use('/api',require('./routes/contract-route'));
app.use('/api',require('./routes/veterinary-route'));
app.use('/api',require('./routes/user-route'));
app.use('/api',require('./routes/history-route'));
app.use('/api',require('./routes/customer-route'));
app.use('/api',require('./routes/veterinarian-route'));


// Starting the server
app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
});