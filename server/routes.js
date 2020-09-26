const { Router } = require("express"); // роутер для работы с маршрутами express
const path = require("path"); // для работы с путями в системе
var fs = require("fs"); // для работы с файлами в системе

const router = Router(); // экземпляр роутера

// Запрос /api
router.post("/api", async (request, response) => {
  // аргументы - запрос и ответ
  const token = request.body.token; // токен, полученный с клиента
  // путь к файлу newmanRun.js, где записана логика запуска newman
  const newmanRunFilePath = path.resolve(process.cwd(), "./newmanRun");
  // путь к файлу newmanReports.js для записи результатов тестов
  const newmanReportFilePath = path.resolve(
    process.cwd(),
    "./newmanReports.json"
  );

  try {
    await new Promise((resolve, reject) => {
      // ждем пока действие завершится
      try {
        require(newmanRunFilePath)(token); // действие подключения файла newmanRun
        // если newman отработал и записал результаты тестов в файл newmanReports
        // если файла newmanReports существует выходим из действия
        if (fs.existsSync(newmanReportFilePath)) resolve();
      } catch (err) {
        reject(err);
      }
    });
    // вышли из действия

    // читаем из файла newmanReports.json данные и преобразуем в js объект
    let report = JSON.parse(fs.readFileSync(newmanReportFilePath, "utf8"));
    console.log(report);
    // отправляем на клиент отчет о тестах
    response.status(200).json(report);
  } catch (err) {
    // при ошибке
    console.log("err", err);
    // отправляем на клиент ошибку
    response.status(500).json(err);
  }
});

module.exports = router;
