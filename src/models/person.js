const connection  = require('../database.js');

class Person {
    constructor (id, name, last_name, phone, address,dni){
        this.id = id
        this.name = name
        this.phone = phone
        this.last_name = last_name
        this.dni = dni
        this.address = address
    }
    getPerson(id,handler){
      connection.query('SELECT * FROM Person WHERE person_id = ? ', [id], (err, rows) => {
        if(!err) {
          const person = rows[0]
          const response = new Person(
            person.person_id,
            person.name,
            person.last_name, 
            person.phone,
            person.address,
            person.dni)
          handler(response,null)
        } else {
          console.log(err);
          handler(null,err)
        } 
      })
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