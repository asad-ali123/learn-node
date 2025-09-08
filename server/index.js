const http = require("http");
const fs = require("fs");
const url = require("url");

const myHandler = (req, res) => {
  if (req.url === "/favicon.ico") res.end();
 const myUrl = url.parse(req.url);
  const now = new Date().toLocaleString();
  const log = `${now}: ${req.method} ${req.url} New Req Received\n`;
  fs.appendFile("./log.text", log, (err, data) => {
    switch (myUrl.pathname) {
      case "/":
        res.end("HomePage");
        break;
      case "/about":
        res.end("My self Asad Ali");
        break;

      case "/signup":
        if (req.method === "GET") {
          res.end("Sign Up Form");
        }
        break;
      default:
        res.end("404 Not Found!!");
        break;
    }
  });
};


const myServer = http.createServer(myHandler);

myServer.listen(3000, () => console.log("Server Started!"));
