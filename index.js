var express = require("express");
var cors = require("cors");
var app = express();

const fetch = require("node-fetch");
const dotenv = require("dotenv");

dotenv.config();
app.use(cors());

app.get("/", function (req, res) {
  const cityName = "Burnaby"; //to be replaced with post data
  const apiKey = process.env.API_KEY;
  const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast/?q=${cityName},CA&appid=${apiKey}&units=metric`;

  fetch(weatherUrl)
    .then((res) => res.json())
    .then((data) => {
      //   console.log(data);
      res.send(data);
    })
    .catch(console.log);
});

app.listen(3001, function () {
  console.log("app listening on port 3001");
});
