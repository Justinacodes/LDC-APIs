const mongoose = require("mongoose");

// Define the schema for the user
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    },
  
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create a model from the schema
const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
