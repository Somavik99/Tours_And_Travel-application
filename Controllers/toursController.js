import Tours from "../Model/ToursSchema.js";
import User from "../Model/UserSchema.js";

// Posting a travel location

export async function postToursLocation(req, res, next) {
  const {
    title,
    city,
    address,
    distance,
    price,
    maxGroupSize,
    photo,
    featured,
  } = req.body;
  const userId = req.userId;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found...!" });
    }

    const newTours = new Tours({
      title,
      city,
      address,
      distance,
      price,
      maxGroupSize,
      photo,
      featured,
      user: {
        id: userId,
        name: user.name,
        email: user.email,
      },
    });

    await newTours.save();

    res.status(200).json({ success: true, message: "New tour posted...!" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Internal server error: ${error.message}...!`,
    });
  }
}

// All Tours data fetching

export async function getAllToursData(req, res, next) {
  try {
    let { limit, skip } = req.query;

    limit = parseInt(limit, 10) || 10;
    skip = parseInt(skip, 10) || 0;

    if (limit < 0 || skip < 0) {
      return res
        .status(400)
        .json({ success: false, message: "Limit cannot be negative...!" });
    }

    console.log("Limit :", limit, "Skip :", skip);

    const tour = await Tours.find().limit(limit).skip(skip);

    const totalCount = await Tours.countDocuments();

    return res.status(200).json({
      success: true,
      message: "Limit applied to the data...!",
      data: tour,
      totalCount: totalCount,
      limit: limit,
      skip: skip,
      currentPage: Math.floor(skip / limit) + 1,
      totalPages: Math.ceil(totalCount / limit),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Internal server error : ${error.message}...!`,
    });
  }
}

// Single Tour data fetching

export async function getSingleTourData(req, res, next) {
  const tourId = req.params.id;

  try {
    const singleTour = await Tours.findById(tourId);
    if (!singleTour) {
      return res
        .status(404)
        .json({ success: false, message: "Tour data doesn't exist...!" });
    }
    res.status(200).json({
      success: true,
      message: "Tour data fetched...!",
      data: singleTour,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Internal server error : ${error.message}...!`,
    });
  }
}

// Deleting a tour data from the database

export async function deleteTourData(req, res, next) {
  const tourId = req.params.id;
  const userId = req.userId;
  try {
    const findTourById = await Tours.findById(tourId);
    if (!findTourById) {
      return res
        .status(404)
        .json({ success: false, message: "Tour id doesn't exist...!" });
    }

    if (findTourById.user.id.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized: No permission to delete...!",
      });
    }

    await Tours.findByIdAndDelete(tourId);
    res
      .status(200)
      .json({ success: true, message: "Data deleted successfully...!" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Internal server error : ${error.message}...!`,
    });
  }
}

// Updating Tour data

// export async function updateTourData(req, res, next) {
//   try {
//   const updateTour = req.params.address;

// } catch (error) {}
// }

// export async function getLimitedToursData(req, res, next) {
  
// }
