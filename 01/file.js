const fs = require("fs");
const os = require("os");

console.log(os.cpus().length);

// Sync
// fs.writeFileSync("./test.txt", "Hey FS");

// Async
// fs.writeFile("./test.txt", "Hey Fs Async", (err) => {
//   console.log(err);
// });

// delete file
// fs.unlinkSync('./test.js')
