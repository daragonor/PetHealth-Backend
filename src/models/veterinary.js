const connection  = require('../database.js');
const helpers = require('../lib/helpers');

class Veterinary {
    constructor (id, social_url_id, name, phone, location,opening_hours){
        this.id = id
        this.social_url_id = social_url_id
        this.name = name
        this.phone = phone
        this.location = location
        this.opening_hours = opening_hours
    }
    getVeterinary(id,handler){
      connection.query('SELECT * FROM Veterinary WHERE veterinary_id = ? ', [id], (err, rows) => {
        if(!err) {
          const veterinary = rows[0]
          const response = new Veterinary(
            veterinary.veterinary_id,
            veterinary.social_url_id,
            veterinary.name,
            veterinary.phone,
            veterinary.location,
            veterinary.opening_hours)
          handler(response,null)
        } else {
          console.log(err);
          handler(null,err)
        } 
      })
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

    getCloseVeterinaries(location,radius,handler){
      let veterinaries = [];
      connection.query('SELECT * FROM Veterinary',(err,rows)=>{
        if(err){
          console.log(err);
          handler(null,err);
        }else{
          rows.forEach(vet => {
            let locationVet = {
              lat: vet.latitude,
              long: vet.longitude
            }
            if(helpers.distance(location,locationVet)<=radius){
              veterinaries.push(new Veterinary(
                vet.id,
                vet.social_url_id,
                vet.name,
                vet.phone,
                vet.location,
                vet.opening_hours
              ));
            }
          });
          handler(veterinaries,null);
        }
      });
    }
}

module.exports = new Veterinary()