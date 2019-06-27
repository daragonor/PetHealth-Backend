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
      connection.query('SELECT * FROM User WHERE username = ?', [username], (err, rows) => {
          if(!err) {
            user = new User(rows[0].user_id, rows[0].username, rows[0].password, rows[0].mail, rows[0]. photo, rows[0].userable_type)
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

    updateUser(userId,user,handler){
      connection.query('UPDATE User SET ? WHERE user_id = ?',[user,userId],(err,result)=>{
        if(err){
          console.log(err.message);
          handler(err);
        }else{
          handler(null);
        }
      });
    }
  }

  module.exports = new User()
