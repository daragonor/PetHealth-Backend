const connection  = require('../database.js');
const helpers = require('../lib/helpers');

class Veterinary {
    constructor (id, social_url_id, name, phone, location,opening_hours,latitude,longitude){
        this.id = id
        this.social_url_id = social_url_id
        this.name = name
        this.phone = phone
        this.location = location
        this.opening_hours = opening_hours
        this.latitude = latitude
        this.longitude = longitude
    }
    getVeterinary(id,handler){
      connection.query('SELECT * FROM Veterinary WHERE veterinary_id = ? ', [id], (err, rows) => {
        if(!err) {
          let response;
          rows.forEach( veterinary =>{
            response = new Veterinary(
              veterinary.veterinary_id,
              veterinary.social_url_id,
              veterinary.name,
              veterinary.phone,
              veterinary.location,
              veterinary.opening_hours,
              veterinary.latitude,
              veterinary.longitude)
          });
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

    getCloseVeterinaries(location,handler){
      let dataVeterinaries = [];
      //let veterinaries = [];
      connection.query('SELECT * FROM Veterinary',(err,rows)=>{
        if(err){
          console.log(err);
          handler(null,err);
        }else{
          const limit = 1;
          rows.forEach(vet => {
            let dataVet = {
              veterinary: null,
              distance: 0
            }
            let locationVet = {
              lat: vet.latitude,
              long: vet.longitude
            }
            dataVet.veterinary = new Veterinary(
              vet.id,
              vet.social_url_id,
              vet.name,
              vet.phone,
              vet.location,
              vet.opening_hours,
              vet.latitude,
              vet.longitude
            );
            dataVet.distance = helpers.distance(location,locationVet);
            dataVeterinaries.push(dataVet);
            /*veterinaries.push(new Veterinary(
              vet.id,
              vet.social_url_id,
              vet.name,
              vet.phone,
              vet.location,
              vet.opening_hours,
              vet.latitude,
              vet.longitude
            ));*/
            
            //dataVeterinary.distance.push(helpers.distance(location,locationVet));
          });
          dataVeterinaries.sort((data1,data2)=>parseFloat(data1.distance)-parseFloat(data2.distance));
          let resData = dataVeterinaries.slice(0,limit);
          handler(resData,null);
        }
      });
    }
}

module.exports = new Veterinary()