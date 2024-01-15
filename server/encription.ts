const fs = require("fs")
const crypto = require('crypto');
const algorithm = 'aes-256-cbc';


const encription = () => {
  const secret = 'shezhuansauce';
  var data = fs.readFileSync('./config/test.json', 'utf8', (err, data) => {

      if (err) {
        console.error(err);
        return;
      }
      let newData = JSON.parse(data)
      return newData;
    });
    if(!data) {
        let key = data.key;
        let iv = data.iv;

        const jsonToWrite = {"key": key,
        "iv": iv}


        return jsonToWrite;
    } else {
        let key = crypto.createHash('sha256').update(String(secret)).digest('base64').substr(0, 32);
        let iv = crypto.randomBytes(16).toString('hex').slice(0, 16);
      
        const jsonToWrite = {
            "key": key,
            "iv": iv
        }

        var json = JSON.stringify(jsonToWrite)
        fs.writeFile('./config/test.json', json, err => {
            if (err) {
              console.error(err);
            }
        }); 
        return jsonToWrite;
    }
  }


  exports.encription = encription;