const express = require("express");
const { connectMongoDB } = require("./connection");
// const allData = require("./MOCK_DATA.json");
const fs = require("fs");
const { userRouter } = require("./routes/user");
const app = express();
const PORT = 3000;

connectMongoDB("mongodb://127.0.0.1:27017/first-db");

// middleware
app.use(express.urlencoded({ extended: false }));

// app.use((req, res, next) => {
//   const date = new Date().toLocaleString();
//   fs.appendFile(
//     "./log.txt",
//     `\n ${date}  ${req.ip}  ${req.path} ${req.method}`,
//     (err, data) => {
//       next();
//     }
//   );
// });

app.use("/api/users", userRouter);

app.listen(PORT, () => console.log("server is started at 3000"));
