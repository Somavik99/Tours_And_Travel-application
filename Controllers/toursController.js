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
    const findTours = await Tours.find();

    res
      .status(200)
      .json({ success: true, message: "All tours data...!", data: findTours });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: `Tours data not fetched. Error happened : ${error.message}...!`,
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
