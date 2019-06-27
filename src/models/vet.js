const connection  = require('../database.js');
const helpers = require('../lib/helpers')
const personAPI = require('./person')
const userAPI = require('./user');

class Vet {
    constructor (id, degree, linkedin){
        this.id = id
        this.degree = degree
        this.linkedin = linkedin
    }
    async getVet(id,handler){
      let query = 'SELECT Veterinarian.veterinarian_id,Veterinarian.degree,Veterinarian.linkedin_link, ';
      query += 'Person.name,Person.last_name, ';
      query += 'User.mail,User.photo ';
      query += 'FROM Veterinarian ';
      query += 'JOIN Person ON Veterinarian.veterinarian_id = Person.person_id '
      query += 'JOIN User ON Veterinarian.veterinarian_id = User.user_id '
      query += 'WHERE veterinarian_id = ?';
      await connection.query(query, [id], (err, rows) => {
        if(!err) {
          let vet;
          helpers.ForEach(rows,(veterinarian)=>{
            vet = veterinarian;
          });
          /*rows.forEach(veterinarian => {
            vet = veterinarian;
          });*/
          const response = {
            id: vet.veterinarian_id,
            name: vet.name,
            last_name: vet.last_name,
            email: vet.mail,
            photo: vet.photo,
            degree:vet.degree,
            linkedin_link: vet.linkedin_link
          }//new Vet(vet.vet_id,vet.degree,vet.linkedin_link)
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
            personAPI.updatePerson(vetId,newData.person,(err)=>{
              if(err){
                console.log(err);
                handler(err);
              }else{
                userAPI.updateUser(vetId, newData.user,(err)=>{
                  if(err){
                    console.log(err);
                    handler(err);
                  }else{
                    handler(null);
                  }
                });
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

module.exports = new Vet()