const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  restaurantName: {
    type: String,
    required: true,
  },
  foodType: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  people: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const Restaurant = mongoose.model("restaurant", restaurantSchema);
module.exports =  Restaurant ;
