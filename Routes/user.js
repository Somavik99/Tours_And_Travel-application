import express from "express";
import {
  authenticateToken,
  restrictUserAccess,
} from "../Authentication/tokenVarification.js";
import {
  deleteRegisteredUser,
  getAllRegisteredUser,
  getSingleRegisteredUser,
  updateRegisteredUser,
} from "../Controllers/userCrudController.js";

const userRouter = express.Router();

userRouter.get(
  "/allRegisteredUsers",
  authenticateToken,
  restrictUserAccess(["user"]),
  getAllRegisteredUser
);
userRouter.get("/singleRegisteredUser/me", authenticateToken, getSingleRegisteredUser);
userRouter.put("/updateRegisteredUser", authenticateToken, updateRegisteredUser);
userRouter.delete("/deleteRegisteredUser", authenticateToken, deleteRegisteredUser);

export default userRouter;