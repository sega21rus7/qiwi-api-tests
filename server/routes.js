const { Router } = require("express");
const path = require("path");
var fs = require("fs");

const router = Router();

router.post("/api", async (request, response) => {
  const token = request.body.token;

  try {
    require(path.resolve(process.cwd(), "./newmanRun"))(token);
    let report = JSON.parse(
      fs.readFileSync(
        path.resolve(process.cwd(), "./newmanReports.json"),
        "utf8"
      )
    );

    console.log(report);
    response.status(200).json(report);
  } catch (err) {
    console.log("err", err);
    response.status(500).json(err);
  }
});

module.exports = router;
