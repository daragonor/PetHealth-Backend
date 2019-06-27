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
      connection.query('SELECT Veterinary.veterinary_id as id, Veterinary.social_url_id, Veterinary.name, Veterinary.phone,Veterinary.location,Veterinary.opening_hours,Veterinary.latitude,Veterinary.longitude,User.photo FROM Veterinary JOIN User ON Veterinary.veterinary_id = User.user_id',(err,rows)=>{
        if(err){
          console.log(err);
          handler(null,err);
        }else{
          const limit = 5;
          
          rows.forEach(vet => {
            let dataVet = {
              veterinary: null,
              distance: 0
            }
            let locationVet = {
              latitude: vet.latitude,
              longitude: vet.longitude
            }
            dataVet.veterinary = {
              id: vet.id,
              social_url_id: vet.social_url_id,
              name: vet.name,
              phone: vet.phone,
              location: vet.location,
              photo: vet.photo,
              opening_hours: vet.opening_hours,
              latitude: vet.latitude,
              longitude: vet.longitude
            }
            
            dataVet.distance = helpers.distance(location,locationVet);
            dataVeterinaries.push(dataVet);
          });
          dataVeterinaries.sort((data1,data2)=>parseFloat(data1.distance)-parseFloat(data2.distance));
          let resData = dataVeterinaries.slice(0,limit);
          handler(resData,null);
        }
      });
    }

    updateVeterinary(vetId,newData,handler){
      connection.query('UPDATE Veterinary SET ? WHERE veterinary_id = ?',[newData.vetData,vetId],(err,result)=>{
        if(!err){
          if(newData.UserData!=null){
            connection.query('UPDATE User SET ? WHERE user_id = ?'[newData.userData,vetId],(err,result)=>{
              if(!err){
                handler(null);
              }else{
                console.log(err);
                handler(err);
              }
            });
          }
        }else{
          console.log(err);
          handler(err);
        }
      });
    }

}

module.exports = new Veterinary()