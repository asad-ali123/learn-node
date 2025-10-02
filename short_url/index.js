import express from "express";
import urlRoute from "./routes/url.js";
import userRoute from "./routes/user.js";
import staticRoute from "./routes/staticRouter.js";
import connectToMongoDB from "./connectDB.js";
import path from "path";
import URL from "./models/url.js";
import cookieParser from "cookie-parser";
import { restrictToLoggedInUserOnly } from "./middlewares/auth.js";
const app = express();
const PORT = 3000;

connectToMongoDB("mongodb://127.0.0.1:27017/short-url").then(() =>
  console.log("MongoDB connected")
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get("/test", async (req, res) => {
  const allUrls = await URL.find({});
  console.log(allUrls);
  return res.render("home", { urls: allUrls });
});

app.use("/url", restrictToLoggedInUserOnly, urlRoute); //for short-Url
app.use("/", restrictToLoggedInUserOnly, staticRoute); //for static route
app.use("/user", userRoute); // for user
app.listen(PORT, () => console.log(`Server is Started at Port ${PORT}`));
