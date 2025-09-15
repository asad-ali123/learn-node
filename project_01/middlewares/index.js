const fs = require("fs");

function logReqRes(fileName) {
  return (req, res, next) => {
    const date = new Date().toLocaleString();
    fs.appendFile(
      fileName,
      `\n ${date}  ${req.ip}  ${req.path} ${req.method}`,
      (err, data) => {
        next();
      }
    );
  };
}

module.exports = logReqRes;
