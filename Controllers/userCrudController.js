import User from "../Model/UserSchema.js";

// All registered user

export async function getAllRegisteredUser(req, res, next) {
  try {
    const users = await User.find().select("-password");
    res
      .status(200)
      .json({ success: true, message: "Users data...!", data: users });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Internal server error: ${error.message}`,
    });
  }
}

// Single Registered User

export async function getSingleRegisteredUser(req, res, next) {
  const userId = req.userId;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found...!" });
    }

    const { password, ...rest } = user._doc;

    res.status(200).json({
      success: true,
      message: "User found...!",
      password,
      data: { ...rest },
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: `User not found...error happened : ${error.message}...!`,
    });
  }
}

// Delete registered user

export async function deleteRegisteredUser(req, res, next) {
  const userId = req.params.id;
  try {
    if (!userId) {
      return res
        .status(404)
        .json({ success: false, message: "User not found...!" });
    }

    await User.findByIdAndDelete(userId);

    res.status(200).json({ success: true, message: "User deleted...!" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Internal server error : ${error.message}...! Failed to delete the user...!`,
    });
  }
}

// Update a registered user

export async function updateRegisteredUser(req, res, next) {
  const userId = req.params.id;
  try {
    const UpdatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: req.body },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile updated...!",
      data: UpdatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Failed to update the user details...! Internal server error : ${error.message}.`,
    });
  }
}
