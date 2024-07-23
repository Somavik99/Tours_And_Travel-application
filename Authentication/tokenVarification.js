import jwt from "jsonwebtoken";
import User from "../Model/UserSchema.js";

export async function authenticateToken(req, res, next) {
  const authUserToken = await req.headers.authorization;

  // console.log(authUserToken)

  if (!authUserToken || !authUserToken.startsWith("Bearer")) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid token, access denied...! " });
  }

  try {
    const token = authUserToken.split(" ")[1];

    // Verifying the generated token while login

    const decodeToken =  jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userId = decodeToken.id;
    req.role = decodeToken.role;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ success: false, message: "Token Expired...!" });
    }
    res.status(404).json({
      success: false,
      message: `Error in authorizing ${error.message}...!`,
    });
  }
}

export const restrictUserAccess = (role) => async (req, res, next) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found...!" });
    }

    const role = user.role;

    role === "user" && role.includes("user")
      ? next()
      : role === "admin" && role.includes("admin")
      ? next()
      : res
          .status(401)
          .json({ success: false, message: "User not authorized...!" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal server error...!" });
  }
};
