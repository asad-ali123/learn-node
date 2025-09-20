import express from "express";
import { handelGenerateShortUrl, handleGetAllUrl, handleGetUrlAndUpdate } from "../controllers/url.js";
const router = express.Router();

router.post("/", handelGenerateShortUrl);
router.get("/all", handleGetAllUrl);
router.get("/:shortId", handleGetUrlAndUpdate);

export default router;
