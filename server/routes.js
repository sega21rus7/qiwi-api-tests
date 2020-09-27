const { Router } = require("express"); // роутер для работы с маршрутами express
const newman = require("newman"); // подключаем newman
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
    if (fs.existsSync(newmanReportFilePath)) {
      // удаляем существующий отчет если есть
      fs.unlinkSync(newmanReportFilePath);
    }
    // запускаем newman
    newman
      .run(
        {
          // коллекцию тестов из файла qiwiApiTests.postman_collection.json
          collection: "./qiwiApiTests.postman_collection.json",
          // отчеты будут в формате json и cli - в консоли
          reporters: ["json", "cli"],
          // логика отчетов
          reporter: {
            json: {
              // json будет записан в файл newmanReports.json
              export: path.resolve(process.cwd(), "./newmanReports.json"),
            },
          },
        },
        (err) => {
          // вызовется при завершении всех тестов
          if (err) throw err; // если есть ошибка выведем ее
          console.log("Collection run completed!");
          // если newman отработал и записал результаты тестов в файл newmanReports
          if (fs.existsSync(newmanReportFilePath)) {
            console.log("exists");
            // читаем из файла newmanReports.json данные и преобразуем в js объект
            const report = JSON.parse(
              fs.readFileSync(newmanReportFilePath, "utf8")
            );
            console.log(report);
            // отправляем на клиент отчет о тестах
            response.status(200).json(report);
          }
        }
      )
      .on("beforeRequest", (err, args) => {
        // перед каждым запросом
        console.log("beforeRequest");
        // добавляем в заголовки запроса токен qiwi
        args.request.headers.add({
          key: "Authorization",
          value: `Bearer ${token}`,
        });
      })
      .on("done", (err, summary) => {
        // завершение
        console.log("done");
      });
  } catch (err) {
    // при ошибке
    console.log("err", err);
    // отправляем на клиент ошибку
    response.status(500).json(err);
  }
});

module.exports = router;
