import express from "express";
import { handleGetAllUser, handleUserSignup } from "../controllers/user.js";

const router = express.Router();

router.post("/", handleUserSignup);
router.get("/all", handleGetAllUser);

export default router;
