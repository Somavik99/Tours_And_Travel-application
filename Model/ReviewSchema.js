import mongoose from "mongoose";

const Review = new mongoose.Schema({
  tours: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tour",
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

  //   setting Up the auth

  user: {
    id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: {
      type: String,
      required: true,
    },
    email:{
      type:String,
      required:true
    }
  },
});

export default mongoose.model("Review", Review);
