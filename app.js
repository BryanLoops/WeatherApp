const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res){

    const query = req.body.cityName.charAt(0).toUpperCase() + req.body.cityName.slice(1);
    const apiKey = "Register on https://api.openweathermap.org and get a free api key";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + unit + "&appid=" + apiKey;

    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDesc = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

            res.write("<p>Current weather in " + query + ": " + weatherDesc + ".</p>");
            res.write("<p>The temperature is: " + temp + " degress Celsius.</p>");
            res.write("<img src=" + imageURL + ">");
            res.send();
        })
    })
})

app.listen(port, function(){
    console.log("Server is running on port: " + port);
})