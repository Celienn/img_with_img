const express = require('express');
const fs = require('fs');
const fileUpload = require('express-fileupload');
const { exec } = require('child_process');
const app = express();
const port = 80;

function getRandom(max) {
  return Math.floor(Math.random() * Math.floor(max)) + 1;
}


const randomCharList = ["a","b","c","d","e","f","g","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]

var Interval = {
  "count" : 0  
}

ShowId = [[],{}]

const res = __dirname + "/ressource"
fs.readdir(res, function(err, filenames) {
    if (err) {
      return;
    }
    filenames.forEach(function(filename) {
        const index = filenames.indexOf(filename)
        var flname = false
        flname = parseInt(filename.split(".")[0]) + "." + filename.split(".")[1]
        if(fs.promises.access(__dirname + "/ressource/" + flname)){
        }else{
          const extension = filename.split(".")[filename.split(".").length-1]
          console.log(res + "/" + filename + " ==> " + res + "/" + index + "." + extension)
          fs.renameSync(res + "/" + filename,res + "/" + index + "." + extension)
        }
    });
});

exec("python " + __dirname + "/init.py")

app.use(fileUpload());

app.get('/show', (req, res) => {
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
  array.forEach(element => {
    if(args["id"] == element){

    }
  });
});

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
    Interval["count"] = Interval["count"] + 1;
    const index = Interval["count"];
    ShowId[0].push(index)
    ShowId[1][index] = ""
    for(var z = 0 ; z < 10 ; z++){
      if(getRandom(z)%2==0){
        ShowId[1][index] = ShowId[1][index] + randomCharList[getRandom(randomCharList.length)-1]
      }else{
        ShowId[1][index] = ShowId[1][index] + randomCharList[getRandom(randomCharList.length)-1].toUpperCase()  
      }
    }
    const filename = ShowId[1][index] + ".jpg"
    fs.writeFile(__dirname + "/temp/" + filename, req.files.image.data, err => {
      if (err) {
        console.error(err)
        return
      }
      try{
        res.redirect(req.baseUrl + "/show?" + ShowId[1][index])
        Interval["count"] = Interval["count"] + 1
        Interval[index-1] = setInterval(() => {
          fs.promises.access(__dirname + "/temp/" + filename).then(function(){
            //exec("python " + __dirname + "/convert.py " + __dirname + "/temp/" + filename)
            clearInterval(index-1)
          }).catch(function(){});
        });
        Interval[index] = setInterval(() => {
          try{  
            fs.promises.access(__dirname + "/temp/output_" + ShowId[1][index-1] + ".jpg").then(
              function(){
                console.log("Fichier trouvé")
              }
            ).catch(
              function(){
                console.log("Fichier introuvable")
              }
            )

          }
          catch(err){
            console.log(err)
          }
        }, 1000);
      }
      catch(err){
        console.log(err)
      }
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
