const express = require('express');
const fs = require('fs');
const fileUpload = require('express-fileupload');
const { spawn } = require('child_process');
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
        if(parseInt(filename) != index){
            const extension = filename.split(".")[filename.split(".").length-1]
            console.log(res + "/" + filename + " ==> " + res + "/" + index + "." + extension)
            fs.renameSync(res + "/" + filename,res + "/" + index + "." + extension)
        }
    });
});

//spawn("python " + __dirname + "/init.py")

app.use(fileUpload());

app.get('/', (req, res) => {
    var url = req.url.split("?")[1]
    var args = []
    if(url != undefined){
      if(url.split("&") != undefined){
        var url = url.split("&")  
        url.forEach(element => {
          args[element.split("=")[0]] = element.split("=")[1]
        });
      }else{
        args[url.split("=")[0]] = urrl.split("=")[1]
      }
    }
    if(args["file"] == undefined){
      const file = fs.readFile(__dirname + "/client/client.html", 'utf8' , (err, data) => {
        if (err) {
          console.error(err)
          return
        }else{
          res.sendFile(__dirname + "/client/client.html")
        }
      })
    }else{
      try{
        res.sendFile(__dirname + "/client/" + args["file"])
      }
      catch(err){
        console.log(err)
      }
    }
});

app.post("/upload",(req,res) => {
  try{
    const filename = "test.jpg"
    fs.writeFile(__dirname + "/temp/" + filename, req.files.image.data, err => {
      if (err) {
        console.error(err)
        return
      }
      try{
        spawn("python " + __dirname + "/convert.py " + __dirname + "/temp/" + filename)
      }
      catch(err){
        console.log(err)
      }
      res.redirect(req.url)
    })
  }
  catch(err){
    if(err){
      res.send("No file selected .")
    }
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}!`)
});
