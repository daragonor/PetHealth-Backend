const connection  = require('../database.js');

class Vet {
    constructor (id, degree, linkedin){
        this.id = id
        this.degree = degree
        this.linkedin = linkedin
    }
    getVet(id,handler){
      connection.query('SELECT * FROM Veterinarian WHERE veterinarian_id = ? ', [id], (err, rows) => {
        if(!err) {
          const vet = rows[0]
          const response = new Vet(vet.vet_id,vet.degree,vet.linkedin_link)
          handler(response,null)
        } else {
          console.log(err);
          handler(null,err)
        } 
      })
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