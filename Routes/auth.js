import express from "express";
import {
  loggingInUser,
  registerUser,
} from "../Controllers/userAuthentication.js";

const router = express.Router();

router.post("/userRegistration", registerUser);
router.post("/userLogin", loggingInUser);

export default router;
