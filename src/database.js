const mysql = require('mysql');
if (process.env.JAWSDB_URL){
  var mysqlConnection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'pethealth_db',
    multipleStatements: true
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