const connection  = require('../database.js');

class Person {
    constructor (id, last_name, name, phone, address,dni){
        this.id = id
        this.name = name
        this.phone = phone
        this.last_name = last_name
        this.dni = dni
        this.address = address
    }
    addPerson(person,handler) { 
      connection.query('INSERT INTO Person SET ? ', person, (err, rows) => {
        if(!err) {
            handler(rows.insertId,null)
        } else {
            console.log(err);
            handler(null,err)
        } 
      })
    }
}

module.exports = new Person()