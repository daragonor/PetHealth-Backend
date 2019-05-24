const connection  = require('../database.js');

class Customer {
    constructor (id, degree, linkedin_link){
        this.id = id
        this.degree = degree
        this.linkedin_link = linkedin_link
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
}

module.exports = new Customer()