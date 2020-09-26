const { Router } = require("express");
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
    await new Promise((resolve, reject) => {
      try {
        require(newmanRunFilePath)(token);
        if (fs.existsSync(newmanReportFilePath)) resolve();
      } catch (err) {
        reject(err);
      }
    });

    let report = JSON.parse(fs.readFileSync(newmanReportFilePath, "utf8"));
    console.log(report);
    response.status(200).json(report);
  } catch (err) {
    console.log("err", err);
    response.status(500).json(err);
  }
});

module.exports = router;
