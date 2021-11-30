const submit = document.getElementById("submit")
const form = document.getElementById("form")
const resolution = document.getElementById("resolution")
const pixelresolution = document.getElementById("pixelresolution")

setInterval(function(){
    form.action = "/upload?resolution=" + resolution.value + "&pixelresolution=" + pixelresolution.value
    console.log("resolution : " + resolution.value)
    console.log("pixelresolution : " + pixelresolution.value)
    console.log(form.action)
},1000);