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
  ShowId[0].forEach(element => {
    if(args["id"] == ShowId[1][element]){
      fs.promises.access(__dirname + "/temp/output_" + ShowId[1][element] + ".jpg").then(function(){
        res.sendFile(__dirname + "/temp/output_" + ShowId[1][element] + ".jpg")
      }).catch(function(){
        res.send("Fichier en cour de traitement ...")
      });
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
  try{
    Interval["count"] = Interval["count"] + 1;
    const index = Interval["count"];
    ShowId[0][ShowId[0].length] = index
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
        res.redirect(req.baseUrl + "/show?id=" + ShowId[1][index])
        var init = exec("python " + __dirname + "/init.py " + parseInt(args["resolution"]) + " " + parseInt(args["pixelresolution"]))
        init.on('exit',function(){
          exec("python " + __dirname + "/convert.py " + __dirname + "/temp/" + filename + " " + parseInt(args["resolution"]) + " " + parseInt(args["pixelresolution"]))
        });
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
