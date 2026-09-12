const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function registerUser(req, res) {
  const { username, password } = req.body;

  if (!username) {
    return res.status(401).json({
      message: "Username not found",
    });
  } else if (!password) {
    return res.status(401).json({
      message: "Password not found",
    });
  }

  const isUserAlreadyExists = await userModel.findOne({
    username,
  });

  if (isUserAlreadyExists) {
    return res.status(401).json({
      message: "User Already Exists",
    });
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username,
    password: hash,
  });

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("token", token, {
    httpOnly: true,
    // secure: false, // localhost
    // sameSite: "lax",
  });

  res.status(201).json({
    message: "User Created Successfully",
    user: {
      id: user._id,
      username: user.username,
      password: user.password,
    },
  });
}

async function loginUser(req, res) {
  const { username, password } = req.body;

  if (!username) {
    return res.status(401).json({
      message: "Username not found",
    });
  } else if (!password) {
    return res.status(401).json({
      message: "Password not found",
    });
  }

  const user = await userModel.findOne({ username });

  if (!user) {
    return res
      .status(401)
      .json({ message: "User not found, invalid credentials" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid Password" });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.cookie("token", token, {
    httpOnly: true,
    // secure: false, // localhost
    // sameSite: "lax",
  });

  res.status(200).json({
    message: "user loggedin successfully",
    user: {
      id: user._id,
      username: user.username,
    },
  });
}

async function logoutUser(req, res) {
  res.clearCookie("token");
  res.status(200).json({ message: "User logged out successfully" });
}

module.exports = { registerUser, loginUser, logoutUser };
