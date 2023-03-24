const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
    const query = req.body.cityName;
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid=66ffad5657fe78f3db424c768b722ef9&units=metric";

    https.get(url,function(response){
        console.log(response.statusCode);
        response.on("data",function(data){
          const weatherData = JSON.parse(data);
          const temp = weatherData.main.temp;
         const weatherDescription = weatherData.weather[0].description;
         const icon = weatherData.weather[0].icon;
         const imageUrl = "https://openweathermap.org/img/wn/"+icon+"@2x.png"
         res.write("<P>The weather is currently "+weatherDescription+ "<p>");
         res.write("<h1>The Temperature in "+query+" is "+temp+" degree celcius </h1>");
         res.write("<img src="+imageUrl+">")
         res.send();
    })
      })
})



app.listen(3000,function(){
    console.log("port running at 3000");
});