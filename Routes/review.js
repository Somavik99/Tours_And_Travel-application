import express  from "express"
import { authenticateToken } from "../Authentication/tokenVarification.js";
import { getAllReviewComments, postUserReviewComment } from "../Controllers/reviewController.js";

const reviewRouter = express.Router();


// POST=> http://localhost:6000/api/v1/review/tours/:id/review

reviewRouter.post('/tours/:id/review', authenticateToken, postUserReviewComment);
reviewRouter.get('/all_reviews', getAllReviewComments)
export default reviewRouter;