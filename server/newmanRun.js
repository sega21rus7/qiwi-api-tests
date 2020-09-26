const newman = require("newman"); // подключаем newman
const path = require("path"); // для работы с путями

module.exports = (token) => {
  // получаем в параметрах функции токен qiwi
  newman
    .run(
      // запускаем newman
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
};
