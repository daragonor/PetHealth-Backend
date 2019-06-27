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

const dbcall = (query,params) => {
  return new Promise((resolve, reject) => {
    mysqlConnection.query(
          query,params,
          (error, rows, results) => {
              if (error) return reject(error);
              return resolve(rows);
          });
  });
};

class MysqlDB{
  async query(query,params,handler){
    try{
      let rows = await dbcall(query,params);
      handler(null,rows);
    }catch(error){
      handler(error,null);
    }
  }
}

module.exports = new MysqlDB();