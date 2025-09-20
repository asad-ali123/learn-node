import express from "express";
import {
  handelGenerateShortUrl,
  handleGetAllUrl,
  handleGetAnalytic,
  handleGetUrlAndUpdate,
} from "../controllers/url.js";
const router = express.Router();

router.post("/", handelGenerateShortUrl);
router.get("/all", handleGetAllUrl);
router.get("/:shortId", handleGetUrlAndUpdate);
router.get("/analytics/:id", handleGetAnalytic);

export default router;
