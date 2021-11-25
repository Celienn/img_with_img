const { count } = require('console');
const express = require('express');
const fs = require('fs');
const { stringify } = require('querystring');
const app = express();
const port = 80;

function getRandom(max) {
  return Math.floor(Math.random() * Math.floor(max)) + 1;
}

const res = __dirname + "/ressource"
fs.readdir(res, function(err, filenames) {
    if (err) {
      return;
    }
    filenames.forEach(function(filename) {
        const index = filenames.indexOf(filename)
        const extension = filename.split(".")[filename.split(".").length-1]
        console.log(res + "/" + filename + " ==> " + res + "/" + index + "." + extension)
        fs.renameSync(res + "/" + filename,res + "/" + index + "." + extension)
    });
});

app.get('/', (req, res) => {
    const file = fs.readFile(__dirname + "/client/client.html", 'utf8' , (err, data) => {
        if (err) {
          console.error(err)
          return
        }
    })
    res.sendFile(__dirname + "/client/client.html")
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}!`)
});
