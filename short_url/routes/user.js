import express from "express";
import {
  handleGetAllUser,
  handleUserSignup,
  handleUserLogin,
} from "../controllers/user.js";

const router = express.Router();

router.get("/all", handleGetAllUser);
router.post("/", handleUserSignup);
router.post("/login", handleUserLogin);

export default router;
