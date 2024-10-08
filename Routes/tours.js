import express from "express";
import { authenticateToken } from "../Authentication/tokenVarification.js";
import {
  getAllToursData,
  getSingleTourData,
  postToursLocation,
} from "../Controllers/toursController.js"; 

const tourRouter = express.Router();

tourRouter.post("/sendTourLocation", authenticateToken, postToursLocation);
tourRouter.get("/getAllToursData", getAllToursData);
tourRouter.get("/singleTourData/:id", getSingleTourData);

export default tourRouter;
