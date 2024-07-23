import mongoose from "mongoose";

const Tours = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  distance: {
    type: Number,
  },
  price: {
    type: Number,
    required: true,
  },
  maxGroupSize: {
    type: Number,
    default: 10,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  featured: {
    type: Boolean,
    required: true,
  },

  // Setting up review ref

  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "review" }],

  //   Having user or auth to work with logIn, signUp and auth

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

export default mongoose.model("Tours", Tours);
