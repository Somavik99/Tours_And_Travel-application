import express from 'express';
import { authenticateToken } from '../Authentication/tokenVarification.js';
import { getAllToursData, getLimitedToursData, getSingleTourData, postToursLocation } from '../Controllers/toursController.js';

const tourRouter = express.Router();

tourRouter.post("/sendTourLocation", authenticateToken, postToursLocation);
tourRouter.get("/getAllToursData", getAllToursData);
tourRouter.get("/singleTourData", getSingleTourData);
tourRouter.get("/limited_tours?limit=&skip=", getLimitedToursData);

export default tourRouter;