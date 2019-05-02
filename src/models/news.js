const connection  = require('../database.js');


class News {
    constructor ( id, content, image ){
        this.id = id
        this.content = content
        this.image = image
    }
    getNews(handler) { 
        var news = []
        connection.query('SELECT * FROM News', (err, rows, fields) => {
            if(!err) {
                for (var i = 0; i < rows.length; i++) {
                    news.push(new News(
                      rows[i].News_id,
                      rows[i].content,
                      rows[i].image))
                }
                handler(news,null)
            } else {
              console.log(err);
              handler(null,err)
            }
          });  

    }
  }
  
module.exports = new News()