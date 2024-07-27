import Booking from "../Model/BookingSchema.js";
import User from "../Model/UserSchema.js"
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
  const tourID  = req.params.id
  try {
    const user = await User.findById(userID);
if(!user){
    return res.status(404).json({success:false, message:"user does not exist...!"})
}



  } catch (error) {
    
  }
}
