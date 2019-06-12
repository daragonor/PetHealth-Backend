const connection  = require('../database.js');

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
      connection.query('UPDATE Person Set ? WHERE person_id = ?',[newData.personData,customerId],(err,result)=>{
        if(!err){
          if(newData.personData!=null){
          connection.query('UPDATE User Set ?  WHERE user_id = ?',[newData.userData,customerId],(err,result)=>{
            if(!err){
              handler(null);
            }else{
              console.log(err);
              handler(err);
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