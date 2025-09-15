const express = require("express");
const { connectMongoDB } = require("./connection");
// const allData = require("./MOCK_DATA.json");
const userRouter = require("./routes/user");
const logReqRes = require("./middlewares");
const app = express();
const PORT = 3000;

connectMongoDB("mongodb://127.0.0.1:27017/first-db");

// middleware
app.use(express.urlencoded({ extended: false }));

app.use(logReqRes("log.txt"));

app.use("/api/users", userRouter);

app.listen(PORT, () => console.log("server is started at 3000"));
