import Review from "../Model/ReviewSchema.js";
import Tours from "../Model/ToursSchema.js";
import User from "../Model/UserSchema.js";

export async function postUserReviewComment(req, res, next) {
  const { rating, comment, createdAt } = req.body;
  const tourId = req.params.id;
  const userId = req.userId;
  // console.log("request params : " + req.params);
  console.log("request tourId : " + tourId);
  console.log("request userId : " + userId);
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Comment cannot be posted. User not registered...!",
      });
    }
    const newReview = new Review({
      rating,
      comment,
      createdAt,
      user: {
        id: userId,
        name: user.name,
        email: user.email,
      },
    });
    const createdNewReview = await newReview.save();

    const tour = await Tours.findById(tourId);

    if (!tour) {
      return res.status(404).json({
        success: false,
        message: `Tour with ID ${tourId} not found.`,
      });
    }

    tour.reviews.push(createdNewReview);
    await tour.save();
    return res.status(201).json({
      success: true,
      message: "Review comment added successfully...!",
      data: createdNewReview,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Internal server error : ${error.message}...!`,
    });
  }
}

export async function getAllReviewComments(req, res, next) {
  try {
    const reviews = await Review.find();
    return res
      .status(200)
      .json({
        success: true,
        message: "All review comments are fetched...!",
        data: reviews,
      });
  } catch (error) {
    res.status.json({
      success: false,
      message: `Internal server error : ${error.message}...!`,
    });
  }
}
