import express  from "express"
import { authenticateToken } from "../Authentication/tokenVarification.js";
import { postUserReviewComment } from "../Controllers/reviewController.js";

const reviewRouter = express.Router();


// POST=> http://localhost:6000/api/v1/review/addReview

reviewRouter.post('/addReview', authenticateToken, postUserReviewComment);

export default reviewRouter;