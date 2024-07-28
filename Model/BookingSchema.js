import mongoose from "mongoose";

const Booking = new mongoose.Schema({
  tour: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tour",
    },
    title: {
      type: String,
    },
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    price: {
      type: Number,
    },
  },
  fullName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  bookingDate: {
    type: String,
    required: true,
  },
  maximumPeople: {
    type: Number,
    required: true,
  },
  bookingPrice: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
  },
  user: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
});

export default mongoose.model("Booking", Booking);
