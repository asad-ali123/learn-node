import express from "express";
import urlRouter from "./routes/url.js";
import connectToMongoDB from "./connectDB.js";
const app = express();
const PORT = 3000;

connectToMongoDB("mongodb://127.0.0.1:27017/short-url").then(() =>
  console.log("MongoDB connected")
);
app.use(express.json());

app.use("/url", urlRouter);

app.listen(PORT, () => console.log(`Server is Started at Port ${PORT}`));
