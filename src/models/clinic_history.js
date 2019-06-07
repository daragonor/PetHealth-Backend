const connection  = require('../database.js');

class ClinicHistory{
    async getHistory(petId,handler){
    try {
        var result = await connection.query('SELECT *  FROM ClinicHistory WHERE pet_id = ?',[petId])
        console.log(result)
        return result.RowDataPacket
    } catch(err) {
        throw new Error(err)
    }
    /*
    connection.query('SELECT *  FROM ClinicHistory WHERE pet_id = ?',[petId],(err,rows,fields) => {
        if(err){
            console.log(err);
            handler(null,err);
        }else{
            rows.forEach(item => {
                response.push({
                    id: item.history_id,
                    diagnosis: item.diagnosis,
                    motive: item.motive,
                    appt_id: item.appointment_id
                })
            });
            handler(response,null);
        }
    });*/
    }
}

module.exports = new ClinicHistory();