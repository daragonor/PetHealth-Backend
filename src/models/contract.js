const connection  = require('../database.js');

class Contract{
    constructor(id,start_date,end_date,request,veterinary_id,veterinarian_id){
        this.id=id;
        this.start_date=start_date;
        this.end_date=end_date;
        this.request=request;
        this.veterinary_id=veterinary_id;
        this.veterinarian_id=veterinarian_id;
    }

    getContract(contractId,handler){
        var contract = null;
        connection.query('SELECT *  FROM Contract WHERE contract_id = ?',[contractId],(err,rows,fields) => {
            if(err){
                console.log(err);
                handler(null,err);
            }else{
                rows.forEach(cont => {
                    contract = new Contract(
                        cont.contract_id,
                        cont.start_date,
                        cont.end_date,
                        cont.request,
                        cont.veterinary_id,
                        cont.veterinarian_id
                    );
                });
                handler(contract,null);
            }
        });
    }

    getVeterinaryContracts(veterinaryId,handler){
        var contracts = [];
        connection.query('SELECT * FROM Contract WHERE veterinary_id = ?',[veterinaryId],(err,rows,fields) =>{
            if(err){
                console.log(err);
                handler(null,err);
            }else{
                rows.forEach(contract => {
                    contracts.push( new Contract(
                        contract.contract_id,
                        contract.start_date,
                        contract.end_date,
                        contract.request,
                        contract.veterinary_id,
                        contract.veterinarian_id
                    ));
                });
                handler(contracts,null);
            }
        });
    }

    getVeterinarianContracts(veterinarianId,handler){
        var contracts = [];
        connection.query('SELECT * FROM Contract WHERE veterinarian_id = ?',[veterinarianId],(err,rows,fields) =>{
            if(err){
                console.log(err);
                handler(null,err);
            }else{
                rows.forEach(contract => {
                    contracts.push( new Contract(
                        contract.contract_id,
                        contract.start_date,
                        contract.end_date,
                        contract.request,
                        contract.veterinary_id,
                        contract.veterinarian_id
                    ));
                });
                handler(contracts,null);
            }
        });
    }
    
    createContract(contractData,handler){
        connection.query('INSERT INTO Contract SET ?',[contractData],(err,result) => {
            if(err){
                console.log(err);
                handler(err);
            }else{ 
                handler(null);
            }
        });
    }

    updateContract(contractId,contractData,handler){
        connection.query('UPDATE Contract SET ? WHERE contract_id = ?',[contractData,contractId],(err,result) => {
            if(err){
                console.log(err);
                handler(err);
            }else{ 
                handler(null);
            }
        });
    }

    acceptRequest(contractId,handler){
        connection.query('UPDATE Contract SET request = 1 WHERE contract_id = ?',[contractId],(err,result) => {
            if(err){
                console.log(err);
                handler(err);
            }else{ 
                handler(null);
            }
        });
    }

    deleteContract(contractId,handler){
        connection.query('DELETE FROM Contract WHERE contract_id = ?',[contractId],(err,result) => {
            if(err){
                console.log(err);
                handler(err);
            }else{ 
                handler(null);
            }
        });
    }
}