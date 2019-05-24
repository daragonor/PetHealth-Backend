const connection  = require('../database.js');


class User {
    constructor (id, username, password, mail, photo, userable_type){
        this.id = id;
        this.username = username
        this.password = password
        this.mail = mail
        this.photo = photo
        this.userable_type = userable_type
    }
    getUser(username, handler) { 
      var user = null
      connection.query('SELECT * FROM User WHERE username = ?', [username], async (err, rows) => {
          if(!err) {
            user = new User(rows[0].id, rows[0].username, rows[0].password, rows[0].mail, rows[0]. photo, rows[0].userable_type)
            handler(user,null)
          } else {
            console.log(err);
            handler(user,err)
          }
        });  
    }
    addUser(user, handler) {
        connection.query('INSERT INTO User SET ? ', user, async (err, rows)=>{
            if(!err) {
                handler(rows.insertId,null)
            } else {
                console.log(err);
                handler(null,err)
            }          
        })
    }
  }

  module.exports = new User()
