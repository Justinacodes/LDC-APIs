const Menu = require("../models/menuUploadModel");
const Asyncly = require("../utils/Asyncly");
const jwt = require("jsonwebtoken");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");

const menu = Asyncly(async (req, res) => {
  const { foodName, description, price, image } = req.body;

  const newMenu = new Menu({
    foodName,
    description,
    price,
    image,
  });

  await newMenu.save();

  res
    .status(httpStatus.CREATED)
    .json({ message: "Menu item added" });
});

module.exports = { menu };
