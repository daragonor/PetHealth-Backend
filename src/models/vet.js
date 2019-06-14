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
          //const vet = rows[0]
          let vet;
          rows.array.forEach(veterinarian => {
            vet = veterinarian;
          });
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

    updateVet(vetId,newData,handler){
      connection.query('UPDATE Veterinarian SET ?  WHERE veterinarian_id = ?',[newData.vetData,vetId],(err,result)=>{
        if(!err){
          if(newData.userData!=null){
            connection.query('UPDATE User SET ? WHERE user_id = ?',[newData.userData,vetId],(err,result)=>{
              if(!err){
                handler(null);
              }else{
                console.log(err);
                handler(err);
              }
            });
          }
        }else{

        }
      });
    }
}

module.exports = new Vet()