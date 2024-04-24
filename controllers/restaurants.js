const Restaurant = require("../models/restaurantsModel")
const Asyncly = require("../utils/Asyncly");
const jwt = require("jsonwebtoken");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");



const restaurant = Asyncly(async (req, res) => {
  
  const { restaurantName, foodType, address, time, people } = req.body;

 
  const newRestaurant = new Restaurant({
    restaurantName,
    foodType,
    address,
      time,
    people
     
  });

  
  await newRestaurant.save();

  res
    .status(httpStatus.CREATED)
    .json({ message: "Restaurant successfully registered" });
});

module.exports = {restaurant}