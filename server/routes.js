const { Router } = require("express");
const newman = require("newman");
const path = require("path");
var fs = require("fs");

const router = Router();

router.post("/api", async (request, response) => {
  const token = request.body.token;
  const newmanRunFilePath = path.resolve(process.cwd(), "./newmanRun");
  const newmanReportFilePath = path.resolve(
    process.cwd(),
    "./newmanReports.json"
  );

  try {
    if (fs.existsSync(newmanReportFilePath)) {
      fs.unlinkSync(newmanReportFilePath);
    }
    newman
      .run(
        {
          collection: "./qiwiApiTests.postman_collection.json",
          reporters: ["json", "cli"],
          reporter: {
            json: {
              export: path.resolve(process.cwd(), "./newmanReports.json"),
            },
          },
        },
        (err) => {
          if (err) throw err;
          console.log("Collection run completed!");
          if (fs.existsSync(newmanReportFilePath)) {
            console.log("exists");
            const report = JSON.parse(
              fs.readFileSync(newmanReportFilePath, "utf8")
            );
            console.log(report);
            response.status(200).json(report);
          }
        }
      )
      .on("beforeRequest", (err, args) => {
        console.log("beforeRequest");
        args.request.headers.add({
          key: "Authorization",
          value: `Bearer ${token}`,
        });
      })
      .on("done", (err, summary) => {
        console.log("done");
      });
  } catch (err) {
    console.log("err", err);
    response.status(500).json(err);
  }
});

module.exports = router;
