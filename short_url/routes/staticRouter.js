import express from "express";
import URL from "../models/url.js";
import { restrictTo } from "../middlewares/auth.js";

const router = express.Router();
router.get("/admin/urls", restrictTo(["ADMIN"]), async (req, res) => {
  const allUrls = await URL.find({});
  res.render("home", { urls: allUrls });
});

router.get("/", restrictTo(["NORMAL" , "ADMIN"]), async (req, res) => {
  // const allUrls = await URL.find({});
  // const user = req.user;
  // if (!user) return res.send("user is not found");
  // const allUrls = await URL.find({ createdBy: req.user?._id });
  const allUrls = await URL.find({ createdBy: req.user._id });
  res.render("home", { urls: allUrls });
});

router.get("/signup", async (req, res) => {
  res.render("signup");
});

router.get("/login", async (req, res) => {
  res.render("login");
});

export default router;
