const express = require("express");
const app = express();
const ejs = require("ejs");
const https = require("https");
const fetch = require("node-fetch");

// api key
const myKey = "4c89347f46fc588f75b3c19d2ad24ea8";

// 跨域請求
const cors = require("cors");
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://aiden4939.github.io"
    ], //這邊改成他的伺服器(白名單)，有多個的時候用陣列表示
    optionsSuccessStatus: 200,
  })
);

function ktoC(k) {
  return (k - 273.15).toFixed(2);
}

//middleware
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/:city", async (req, res) => {
  let { city } = req.params;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${myKey}`;

  let d = await fetch(url);
  let djs = await d.json();
  let { temp } = djs.main;
  let newTemp = ktoC(temp);
  res.render("weather.ejs", { djs, newTemp });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});
