const connection  = require('../database.js');

class Appt {
    constructor ( id, appt_date, desc, status, start_t, end_t, register_date, pet_photo, pet_id, vet_id, veterinary_id,type ){
        this.id = id;
        this.appt_date = appt_date
        this.desc = desc
        this.status = status
        this.start_t = start_t
        this.end_t = end_t
        this.register_date = register_date
        this.pet_photo = pet_photo
        this.pet_id = pet_id
        this.vet_id = vet_id
        this.veterinary_id = veterinary_id 
        this.type = type
      }
    getApptsDataByUserId(userId,userableType, handler) { 
      var response = []
      var query = 'SELECT Appointment.*,' 
      query += 'Pet.name, Pet.description as pet_desc, Pet.race, Pet.birth_date, Pet.status as pet_status, Pet.image_url, Pet.owner_id,'
      query += 'Person.name as vet_name,'
      query += 'Veterinary.name as veterinary_name,Veterinary.phone, Veterinary.location '
      query += 'FROM Appointment '
      query += 'JOIN Pet ON Appointment.pet_id = Pet.pet_id '
      query += 'JOIN Person ON Appointment.veterinarian_id = Person.person_id '
      query += 'JOIN Veterinary ON Appointment.veterinary_id = Veterinary.veterinary_id '
      if (userableType == 0){
        query += 'WHERE veterinary_id = ' + userId
      } else if (userableType == 1){
        query += 'WHERE veterinarian_id = ' + userId
      } else if (userableType == 2){
        query += 'WHERE owner_id = ' + userId
      }
      
      
      connection.query(query, [userId],(err, rows, fields) => {
        if(!err) {
          rows.forEach(appt => {
            response.push({
              appointment:new Appt(
                appt.appointment_id,
                appt.appointment_date,
                appt.description,
                appt.status,
                appt.start_time,
                appt.end_time,
                appt.register_date,
                appt.pet_photo,
                appt.pet_id,
                appt.veterinarian_id,
                appt.veterinary_id,
                appt.type
              ),
              pet:{
                name : appt.name,
                description : appt.pet_desc,
                race : appt.race,
                birth_date : appt.birth_date,
                status : appt.pet_status,
                image_url : appt.image_url,
                owner_id : appt.owner_id,
              },
              veterinarian: {
                name: appt.vet_name
              },
              veterinary:{
                name: appt.veterinary_name,
                phone: appt.phone,
                location: appt.location
              }
            })
          })
          handler(response,null)
        } else {
          console.log(err);
          handler(null,err)
        }
      }); 
    }
  }
  
module.exports = new Appt()