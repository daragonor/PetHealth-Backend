const connection  = require('../database.js');

class Veterinary {
    constructor (id, social_url_id, name, phone, location,opening_hours){
        this.id = id
        this.social_url_id = social_url_id
        this.name = name
        this.phone = phone
        this.location = location
        this.opening_hours = opening_hours
    }
    addVeterinary(veterinary,handler) { 
      connection.query('INSERT INTO Veterinary SET ? ', veterinary, (err, rows) => {
        if(!err) {
            handler(rows.insertId,null)
        } else {
            console.log(err);
            handler(null,err)
        } 
      })
    }
}

module.exports = new Veterinary()