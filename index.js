import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import auth from "./Routes/auth.js";
import userRouter from "./Routes/user.js";
import cors from "cors";
import tour from "./Routes/tours.js";
import review from "./Routes/review.js";

dotenv.config();

const app = express();

const port = process.env.PORT || 7000;

mongoose.set("strictQuery", false);

async function mongooseConnect() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("DB Connected successfully");
  } catch (error) {
    console.log(`Error connecting to DB: ${error.message}`);
  }
}

app.use(express.json());

app.use(
  cors({
    origin: function (origin, callback) {
      return callback(null, true);
    },
    optionsSuccessStatus: 200,
    credentials: true,
  })
);

app.use(cookieParser());

app.use("/api/v1/authorizations", auth);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/tours", tour);
app.use("/api/v1/review", review);
mongooseConnect()
  .then(function () {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch(function (error) {
    console.log(`Error connecting to DB: ${error.message}`);
  });
