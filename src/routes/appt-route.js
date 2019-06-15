const express = require('express');
const router = express.Router();
const helpers = require('../lib/helpers')
const apptAPI = require('../models/appt.js');

const connection  = require('../database.js');
const dbcall = (query) => {
    return new Promise((resolve, reject) => {
        connection.query(
            query,
            (error, rows, results) => {
                if (error) return reject(error);
                return resolve(rows);
            });
    });
  };
async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}
let response = {
    status:"ok",
    message:"Appointments where retrieved successfuly.",
    data: {}
} 

router.post('/user/:userId/appts',helpers.verifyToken, (req, res) => {
    
    apptAPI.getApptsDataByUserId(req.params.userId,req.body.userable_type, async(apptsData,err) => {
        if (err){}
        response.data = apptsData
        try {
            await asyncForEach(apptsData,async (appt) => {
                const history = await dbcall('SELECT *  FROM ClinicHistory WHERE pet_id = ' + appt.appointment.pet_id);
                appt.pet.history = history
            })
            res.json(response)
          } catch (error) {
              console.log(error);
          }

    });

});

router.post('/veterinaries/:veterinary_id/appointments',helpers.verifyToken,(req,res)=>{
    const {appointment_date,description,status,start_time,end_time,register_date,
        type,pet_photo,pet_id,veterinarian_id} = req.body;
    const veterinary_id = req.params.veterinary_id;
    const newAppointment = {appointment_date,description,status,start_time,end_time,register_date,type,pet_photo,pet_id,veterinarian_id,veterinary_id};
    apptAPI.addAppts(newAppointment,(err)=>{
        let response = {
            status:"",
            message:""
        };
        if(err){
            console.log(err);
            response.status = "Error";
            response.message = "Unable to add appointment";
            res.status(500).send(response);
        }else{
            response.status = "Ok";
            response.message = "Appointmet added successfully";
            res.status(200).send(response);
        }
    });
});

module.exports = router;