const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes");

const app = express();
const port = 8000;

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(routes);

app.listen(port, (err) => {
  if (err) {
    return console.log("Ошибка при запуске сервера", err);
  }
  console.log(`Сервер запущен на порту ${port}`);
});
