const newman = require("newman");
const path = require("path");

module.exports = (token) => {
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
};
