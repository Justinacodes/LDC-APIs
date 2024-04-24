const asyncHandler = require("express-async-handler");


const mongoose = require("mongoose");

const home = asyncHandler(async (req, res) => {
  res.render("index", { title: "Home" });
});



module.exports = {
  home

};
