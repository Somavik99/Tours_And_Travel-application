import bcrypt from "bcrypt";
import User from "../Model/UserSchema.js";
import JWT from "jsonwebtoken";
// import crypto from "crypto";
export async function registerUser(req, res, next) {
  const { name, email, password, phone, role } = req.body;

  const saltBuffer = 10;

  try {
    let user = await User.findOne({ email: email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "User already registered...!" });
    }

    const salt = await bcrypt.genSalt(saltBuffer);

    const hashedPassword = await bcrypt.hash(password.toString(), salt);

    user = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      role,
    });
    await user.save();
    return res
      .status(200)
      .json({ success: true, message: "User registered successfully...!" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

// const Random = crypto.randomBytes(32).toString("hex")

// console.log(Random)

export async function loggingInUser(req, res, next) {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found...!" });
    }
    const passwordIsMatching = await bcrypt.compare(
      req.body.password.toString(),
      user.password
    );

    if (!passwordIsMatching) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Password...!" });
    }

    const token = getTokenFromJson(user);
    const { password, role, ...rest } = user._doc;

    res.status(200).json({
      success: true,
      message: "User Logged in successfully...!",
      token,
      role,
      data: { ...rest },
    });
    console.log(user);
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: `Login failed: ${error.message}...!` });
  }
}

function getTokenFromJson(user) {
  return JWT.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "2d" }
  );
}
