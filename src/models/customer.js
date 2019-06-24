const connection  = require('../database.js');
const personAPI = require('./person')

class Customer {
    constructor (id, rating, lastLogin){
        this.id = id
        this.rating = rating
        this.lastLogin = lastLogin
    }
    getCustomer(id,handler){
      connection.query('SELECT * FROM Customer WHERE customer_id = ? ', [id], (err, rows) => {
        if(!err) {
          const customer = rows[0]
          const response = new Customer(customer.customer_id,customer.rating,customer.last_date_log_on)
          handler(response,null)
        } else {
          console.log(err);
          handler(null,err)
        } 
      })
    }
    addCustomer(customer,handler) { 
      connection.query('INSERT INTO Customer SET ? ', customer, (err, rows) => {
        if(!err) {
            handler(rows.insertId,null)
        } else {
            console.log(err);
            handler(null,err)
        } 
      })
    }
    updateCustomer(customerId,newData,handler){
      connection.query('UPDATE Customer Set ? WHERE customer_id = ?',[newData.personData,customerId],(err,result)=>{
        if(!err){
          if(newData.personData!=null){
            personAPI.updatePerson(customerId,newData.person,(err)=>{
              if(err){
                console.log(err);
                handler(err);
              }else{
                handler(null);
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

module.exports = new Customer()