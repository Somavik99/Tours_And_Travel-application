import Booking from "../Model/BookingSchema.js";
import User from "../Model/UserSchema.js";
import Tours from "../Model/ToursSchema.js";
export async function postBookingTourData(req, res, next) {
  const {
    fullName,
    phoneNumber,
    bookingDate,
    maximumPeople,
    bookingPrice,
    totalPrice,
  } = req.body;
  const userID = req.userId;
  const tourID = req.params.id;
  try {
    const user = await User.findById(userID);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "user does not exist...!" });
    }

    const tour = await Tours.findById(tourID);

    const newBooking = new Booking({
      user: {
        id: userID,
        name: user.name,
        email: user.email,
      },
      tour: tour,
      fullName,
      phoneNumber,
      bookingDate,
      maximumPeople,
      bookingPrice,
      totalPrice,
    });

    const bookingData = await newBooking.save();

    return res.status(200).json({
      success: true,
      message: "Booking complete successfully...!",
      data: bookingData,
    });
  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        message: `internal server error : ${error.message}...!`,
      });
  }
}
