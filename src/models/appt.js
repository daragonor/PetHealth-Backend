const connection  = require('../database.js');


class Appt {
    constructor ( id, appt_date, desc, status, start_t, end_t, register_date, pet_photo, preescription, pet_id, vet_id, veterinary_id ){
        this.id = id;
        this.appt_date = appt_date
        this.desc = desc
        this.status = status
        this.start_t = start_t
        this.end_t = end_t
        this.register_date = register_date
        this.pet_photo = pet_photo
        this.preescription = preescription 
        this.pet_id = pet_id
        this.vet_id = vet_id
        this.veterinary_id = veterinary_id 
      }
    getAppts(handler) { 
        var appts = []
        connection.query('SELECT * FROM Appointment', (err, rows, fields) => {
            if(!err) {
              rows.forEach(appt => {
                appts.push(new Appt(
                  appt.Appointment_id,
                  appt.Appointment_date,
                  appt.Description,
                  appt.status,
                  appt.Starttime,
                  appt.End_Time,
                  appt.Register_Date,
                  appt.Pet_photo,
                  appt.preescription,
                  appt.pet_id,
                  appt.vet_id,
                  appt.veterinary_id
                  ))
              });
                
              handler(appts,null)
            } else {
              console.log(err);
              handler(null,err)
            }
          });  
    }
  }
  
module.exports = new Appt()