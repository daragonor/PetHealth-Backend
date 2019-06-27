const connection  = require('../database.js');
const personAPI = require('./person');
const userAPI = require('./user');

class Customer {
    constructor (id, rating, lastLogin){
        this.id = id
        this.rating = rating
        this.lastLogin = lastLogin
    }

    getCustomers(handler){
      connection.query('SELECT *  FROM view_customer',null,(err,rows)=>{
        if(err){
          console.log(err);
          handler(null,err);
        }else{
          let response
          rows.forEach(cust => {
            response = {
              id: cust.customer_id,
              name: cust.name,
              last_name: cust.last_name,
              dni: cust.dni,
              phone: cust.phone,
              address: cust.address,
              mail: cust.mail,
              username: cust.username,
              photo: cust.photo,
              rating: cust.rating
            };
          });
          handler(response,null);
        }
      });
    }

    getCustomer(id,handler){
      connection.query('SELECT * FROM view_customer WHERE customer_id = ? ', [id], (err, rows) => {
        if(!err) {
          let response
          rows.forEach(cust => {
            response = {
              id: cust.customer_id,
              name: cust.name,
              last_name: cust.last_name,
              dni: cust.dni,
              phone: cust.phone,
              address: cust.address,
              mail: cust.mail,
              username: cust.username,
              photo: cust.photo,
              rating: cust.rating
            };
          });
          handler(response,null);
        } else {
          console.log(err);
          handler(null,err)
        } 
      })
    }

getCustomerEmail(email,handler){
  connection.query('SELECT *  FROM view_customer WHERE mail = ?',[email],(err,rows)=>{
    let response;
    if(err){
      console.log(err);
      handler(null,err);
    }else{
      let response
      rows.forEach(cust => {
        response = {
          id: cust.customer_id,
          name: cust.name,
          last_name: cust.last_name,
          dni: cust.dni,
          phone: cust.phone,
          address: cust.address,
          mail: cust.mail,
          username: cust.username,
          photo: cust.photo,
          rating: cust.rating
        };
      });
      handler(response,null);
    }
  });
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
      personAPI.updatePerson(customerId,newData.person,(err)=>{
        if(err){
          console.log(err);
          handler(err);
        }else{
          userAPI.updateUser(customerId,newData.user,(err)=>{
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
}

module.exports = new Customer()