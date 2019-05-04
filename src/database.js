const mysql = require('mysql');
if (process.env.JAWSDB_URL){
  var mysqlConnection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  var mysqlConnection = mysql.createConnection({
    host: 'k3xio06abqa902qt.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',	
    user: 'g4z7ip3ryyoxcdrd',
    password: 'xddb4awug6wh4uc1',
    database: 'gmpxirv4ivcjeeqb',
    port:'3306'
  });
}

mysqlConnection.connect(function (err) {
  if (err) {
    console.error(err);
    return;
  } else {
    console.log('db is connected');
  }
});

module.exports = mysqlConnection;