const express = require('express');

// Intializations
const app = express();

// Settings
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views',__dirname+'/views');
// Middlewares
app.use(express.json());
app.use(express.static(__dirname+'/public'));
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
app.use('/',require('./routes/landing-route'));


// Starting the server
app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
});