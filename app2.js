const express = require("express"); //express module included
const https = require("https"); //https (node native )module included
//no need to install https becoz its native module that means its already bundled with our node project
const bodyParser = require("body-parser"); //body-parser module included

const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");

  // res.send("Server is up and running");

});

app.post("/", function(req, res) {

  const query = req.body.cityName;
  const apiKey = "hidden";
  const units = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + units;

  https.get(url, function(response) {
    console.log(response.statusCode);

    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      // console.log(weatherData);
      // const object = {
      //   name: "Angela",
      //   favFood: "Ramen"
      // };

      // console.log(JSON.stringify(object));
      const weatherTemp = weatherData.main.temp;

      console.log("temp = " + weatherTemp);
      const weatherDescription = weatherData.weather[0].description;
      console.log("Description: " + weatherDescription);

      const icon = weatherData.weather[0].icon;
      // console.log(icon);
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      console.log(imageURL);

      res.write("<p>The Weather is currently " + weatherDescription + "</p>");
      res.write("<img src=" + imageURL + " width='80'>");
      res.write("<h1>The temperature of " + query + " is " + weatherTemp + " degree Celcius.</h1>");
      res.send();
    });

    console.log(response.statusMessage);

  });

});


app.listen(3030, function() {
  console.log("Server is running on port 3030");
});
