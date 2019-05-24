const connection  = require('../database.js');

class Vet {
    constructor (id, degree, linkedin_link){
        this.id = id
        this.degree = degree
        this.linkedin_link = linkedin_link
    }
    addVet(vet,handler) { 
      connection.query('INSERT INTO Veterinarian SET ? ', vet, (err, rows) => {
        if(!err) {
            handler(rows.insertId,null)
        } else {
            console.log(err);
            handler(null,err)
        } 
      })
    }
}

module.exports = new Vet()