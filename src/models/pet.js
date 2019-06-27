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
    
    getAll(userId,handler){
        var pets = [];
        connection.query('SELECT * FROM Pet WHERE owner_id = ?',[userId],(err,rows)=>{
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
    getPet(userId,petId,handler){
        var pet = null;
        connection.query('SELECT * FROM Pet WHERE owner_id = ? AND pet_id = ?',[userId,petId],(err,rows)=>{
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
        console.log(petData);
        connection.query('INSERT INTO Pet SET ?',[petData],(err,result)=>{
            if(!err){
                handler(null);
            }else{
                console.log(err);
                handler(err);
            }
        });
    }

    updatePet(userId,petData,petId,handler){
        connection.query('UPDATE Pet SET ? WHERE owner_id = ? AND pet_id = ?',[petData,userId,petId],(err,result)=>{
            if(!err){
                handler(null);
            }else{
                console.log(err);
                handler(err);
            }
        });
    }

    deletePet(userId,petId,handler){
        connection.query('DELETE FROM Pet WHERE owner_id = ? AND pet_id = ?',[userId,petId],(err,id)=>{
            if(err){
                handler(null);
            }else{
                console.log(err);
                handler(err);
            }
        });
    }

    updateImage(petId,userId,image_url,handler){
        console.log(image_url);
        connection.query('UPDATE Pet Set ? WHERE pet_id = ? AND owner_id = ?',[image_url,petId,userId],(err,result)=>{
            if(err){
                console.log(err);
                handler(err);
            }else{
                handler(null);
            }
        });
    }
}

module.exports = new Pet();