const Contact = require("../models/contactRestaurantModel");
const Asyncly = require("../utils/Asyncly");
const jwt = require("jsonwebtoken");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");

const contact = Asyncly(async (req, res) => {
  // Extract user information from the request body
  const { name, phone, email, message } = req.body;

  // Create a new user instance with hashed password
  const newContact = new Contact({
    name,
    phone,
    email,
    message,
  });

  // Save the user to the database
  await newContact.save();

  res
    .status(httpStatus.CREATED)
    .json({ message: "Thank you for contacting us!" });
});

module.exports = {contact}
