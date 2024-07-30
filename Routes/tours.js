import express from 'express';
import { authenticateToken } from '../Authentication/tokenVarification.js';
import { getAllToursData, getLimitedToursData, getSingleTourData, postToursLocation } from '../Controllers/toursController.js';

const tourRouter = express.Router();

tourRouter.post("/sendTourLocation", authenticateToken, postToursLocation);
tourRouter.get("/getAllToursData", getAllToursData);
tourRouter.get("/singleTourData", getSingleTourData);
tourRouter.get("/get_limited_data", getLimitedToursData);

export default tourRouter;