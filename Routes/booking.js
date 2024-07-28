import express from "express";
import { authenticateToken } from "../Authentication/tokenVarification.js";
import {
  getAllBookingData,
  postBookingTourData,
} from "../Controllers/bookingTourController.js";

const bookingRouter = express.Router();

bookingRouter.post("/tour/:id/booking", authenticateToken, postBookingTourData);
bookingRouter.get("/all_bookings", getAllBookingData);

export default bookingRouter;
