const connection  = require('../database.js');

class SocialURL {
    constructor (id, web_url, youtube_url, twitter_url){
        this.id = id
        this.web_url = web_url
        this.youtube_url = youtube_url
        this. twitter_url = twitter_url
    }
    addSocialURL(socialURL,handler) { 
      connection.query('INSERT INTO SocialURL SET ? ', socialURL, (err, rows) => {
        if(!err) {
          handler(rows.insertId,null)
        } else {
            console.log(err);
            handler(null,err)
        } 
      })
    }
}

module.exports = new SocialURL()