const express = require("express"); // подключаем express для работы с сервером
const bodyParser = require("body-parser"); // для того чтобы получать json в теле запроса
const routes = require("./routes"); // наши роутеры, адреса по определенным запросам на сервер

const app = express(); // создаем приложение
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
