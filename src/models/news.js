const connection  = require('../database.js');


class News {
    constructor ( id, content, image ){
        this.id = id
        this.content = content
        this.image = image
    }
    getNews(handler) { 
        var newsArr = []
        connection.query('SELECT * FROM News', (err, rows, fields) => {
            if(!err) {
              rows.forEach(news => {
                newsArr.push(new News(
                  news.News_id,
                  news.content,
                  news.image))  
              });
              handler(newsArr,null)
            } else {
              console.log(err);
              handler(null,err)
            }
          });  

    }
  }
  
module.exports = new News()