const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
port = 3000;

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html"); 
});

app.post('/', (req, res) => {
    const query = req.body.cityName
    const key = "f2fa331e31c00391ef5c2da8d07b5861";
    const unit = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + key + "&units=" + unit;
  https.get(url, (resp) => {
    resp.on("data", (data) => {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      res.write(`<h1>The Temp in ${query} is: ${temp}</h1>`);
      res.send();
    });
  });
});

app.listen(port, () => {
  console.log(`The Server is listening on ${port}`);
});
