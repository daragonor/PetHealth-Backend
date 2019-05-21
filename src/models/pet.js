const connection  = require('../database.js');

class Pet{
    constructor(id, name, description, race, birth_date, status, image_url, owner_id){
        this.id = id;
        this.name= name;
        this.description = description;
        this.race = race;
        this.birth_date = birth_date;
        this.status = status;
        this.image_url = image_url;
        this.owner_id = owner_id;
    }
    
    getAll(handler){
        var pets = [];
        connection.query('SELECT * FROM Pet',(err,rows,fields)=>{
                if(!err){
                    rows.forEach(pet => {
                        pets.push(new Pet(
                            pet.pet_id,
                            pet.name,
                            pet.description,
                            pet.race,
                            pet.birth_date,
                            pet.status,
                            pet.image_url,
                            pet.owner_id
                        ))    
                    });
                    
                    handler(pets,null);
                }else{
                    console.log(err);
                    handler(null,err);
                }
        });
    }
    getPet(id,handler){
        var pet = null;
        connection.query('SELECT * FROM Pet WHERE pet_id = ?',[id],(err,rows)=>{
            if(!err){
                rows.forEach(p =>{
                    pet = new Pet(
                        p.pet_id,
                        p.name,
                        p.description,
                        p.race,
                        p.birth_date,
                        p.status,
                        p.image_url,
                        p.owner_id
                    );
                });
                handler(pet,null);
            }else{
                console.log(err);
                handler(null,err);
            }
        })
    }

    addPet(petData,handler){
        connection.query('INSERT INTO Pet SET ?',petData,(err,result)=>{
            if(!err){
                handler(null);
            }else{
                console.log(err);
                handler(err);
            }
        });
    }

    updatePet(petData,petId,handler){
        connection.query('UPDATE Pet SET ? WHERE pet_id = ?',[petData,petId],(err,result)=>{
            if(!err){
                handler(null);
            }else{
                console.log(err);
                handler(err);
            }
        });
    }

    deletePet(id,handler){
        connection.query('DELETE FROM Pet WHERE pet_id = ?',[id],(err,id)=>{
            if(err){
                handler(null);
            }else{
                console.log(err);
                handler(err);
            }
        });
    }
}

module.exports = new Pet();