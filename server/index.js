const http = require("http");
const fs = require("fs");
const myServer = http.createServer((req, res) => {
  const now = new Date().toLocaleString();
  const log = `${now}: ${req.url} New Req Received\n`;
  fs.appendFile("./log.text", log, (err, data) => {
    switch (req.url) {
      case "/about":
        res.end("My self Asad Ali");
        break;

      default:
        res.end("404 Non Found!!");
        break;
    }
  });
});

myServer.listen(3000, () => console.log("Server Started!"));
