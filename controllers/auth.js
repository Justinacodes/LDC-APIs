const User = require("../models/userModel");
const Asyncly = require("../utils/Asyncly");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");


const register = Asyncly(async (req, res) => {
  // Extract user information from the request body
  const { firstname, lastname, email, password } = req.body;

  // Check if the email is already registered
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email is already registered");
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);
  saltrounds = 20
  // 10 is the salt rounds

  // Create a new user instance with hashed password
  const newUser = new User({
    firstname,
    lastname,
    email,
    password: hashedPassword, // Store the hashed password in the database
  });

  // Save the user to the database
  await newUser.save();

  res
    .status(httpStatus.CREATED)
    .json({ message: "User registered successfully" });
});

const login = Asyncly(async (req, res) => {
  // Extract user information from the request body
  const { email, password } = req.body;

  // Check if the user with the provided email exists
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid email or password");
  }

  // Compare the provided password with the hashed password in the database
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid email or password");
  }

  // If the email and password are correct, generate JWT token
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  // Respond with the JWT token
  res.status(httpStatus.OK).json({ token });
});

module.exports = {
  register,
  login
};
