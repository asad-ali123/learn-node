// const fs = require("fs");
// const os = require("os");
import fs from "fs";
import os from "os"

console.log(os.cpus().length);

// Sync
// fs.writeFileSync("./test.txt", "Hey FS");

// Async
// fs.writeFile("./test.txt", "Hey Fs Async", (err) => {
//   console.log(err);
// });

// delete file
// fs.unlinkSync('./test.js')

fs.appendFile('./test.txt' , `Hello Asad!!\n ` , (err)=>{ console.log(err)})

fs.readFile("./test.txt", "utf-8" , (err, result) => {
  if (err) {
    console.log(err);
  } else {
    console.log(result);
  }
});
