const connection  = require('../database.js');
const helpers = require('../lib/helpers');
const apptAPI = require('./appt')


class ClinicHistory{
    async getHistory(petId,handler){
        let histories = [];
        let query = 'SELECT ClinicHistory.*  FROM ClinicHistory ' ;
        query += 'join Appointment on Appointment.appointment_id = ClinicHistory.appointment_id ';
        query += 'WHERE Appointment.pet_id = ?';
        await connection.query(query,[petId],(err,rows)=>{
            if(err){
                console.log(err);
                handler(null,err);
            }else{
                helpers.ForEach(rows,(history)=>{
                    let response = {
                        id: history.history_id,
                        motive: history.motive,
                        diagnosis: history.diagnosis,
                        pet_id: history.pet_id
                    }; 
                    histories.push(response);
                });
                handler(histories,null);
            }
        });
    }

    addHistory(historyData,handler){
        connection.query('INSERT INTO ClinicHistory Set ?',[historyData],(err,result)=>{
            if(err){
                console.log(err);
                handler(err);
            }else{
                apptAPI.finishAppointment(historyData.appointment_id,(error)=>{
                    if(error){
                        console.log(error);
                        handler(error);
                    }else{
                        handler(null);
                    }
                });
            }
        });
    }
}

module.exports = new ClinicHistory();