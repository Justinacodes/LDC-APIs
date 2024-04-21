const asyncHandler = require("express-async-handler");
//const bcrypt = require("bcrypt"); // Import bcrypt for password hashing

const mongoose = require("mongoose");
const home = asyncHandler(async (req, res) => {
  res.render("index", { title: "Home" });
});

//vendors page
mongoose.connect(
  "mongodb+srv://justinaominisan24:" +
    process.env.mongo +
    "@local-dish-corner.e5nsitl.mongodb.net/?retryWrites=true&w=majority&appName=local-dish-corner"
);

const restaurantSchema = new mongoose.Schema({
  restaurant: {
    type: String,
    required: true,
  },
});
const restaurantcollection = new mongoose.model("restaurant", restaurantSchema);
const vendors = asyncHandler(async (req, res) => {
  res.render("vendors", { title: "Vendors" });

  restaurants = [
    {
      restaurant: "Amala Palace",
      food: "Amala and Ewedu",
      Address: "Ozumba Mbadiwe Avenue",
      time: "25 Mins",
      people: "250 for two",
    },
    {
      restaurant: "Becca Food",
      food: "Ofada Rice",
      Address: "MEkunwen road",
      time: "30 mins",
      people: "300 for two",
    },
    {
      restaurant: "Chapters",
      food: "Masa",
      Address: "Awolowo Road",
      time: "20 mins",
      people: "150 for two",
    },
    {
      restaurant: "Calabar Kitchen",
      food: "Ekpang/ Fish Soup",
      Address: "healthy food, salads",
      time: "40 mins",
      people: "300 for two",
    },
  ];
  res.send(restaurants);

  restaurantcollection.insertMany(restaurants);
});

const customers = asyncHandler(async (req, res) => {
  res.render("customers", { title: "Customers" });
});

// function customers(req, res) {
//   res.send("customers", { title: "Customers" });
// }
const menu = asyncHandler(async (req, res) => {
  res.render("menu", { title: "Menu" });
});

const contact = asyncHandler(async (req, res) => {
  res.render("contact", { title: "Contact" });
});

const search = asyncHandler(async (req, res) => {
  res.render("search", { title: "Search" });
});

const Cuisines = require("../models/cuisines");
const cuisines = asyncHandler(async (req, res) => {
  const cuisine = new Cuisine({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
    // const id = req.params.cuisinesId;
    // cuisines
    //   .findById(id)
    //   .exec()
    //   .then((doc) => {
    //     console.log(doc);
    //     res.status(200).json(doc);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     res.status(500).json({ error: err });
    //   });
  });
  cuisine
    .save()
    .then((result) => {
      console.log(result);
    })
    .catch((err) => console.log(err));
  res.status(201).json({
    message: "Handling Post requests",
    createdCuisine: cuisine,
  });
});

const explore = asyncHandler(async (req, res) => {
  res.render("explore", { title: "Explore" });
});

const registerUser = asyncHandler(async (req, res) => {
  res.render("registerUser", { title: "Register a user" });
  const { username, email, password } = req.body;

  // Validate input
  if (!username || !email || !password) {
    return res.status(400).send("Please provide username, email, and password");
  }

  if (userExists(email)) {
    return res.status(400).send("User already exists");
  }
  const newUser = {
    username: String,
    email: String,
    password: String,
  };

  saveUser(newUser);
  res.send("User registration successful", newUser);
});

const userExists = asyncHandler(async (req, res) => {
  res.render("Userexists", { title: "User Exists" });

  try {
    const user = await User.findOne({ email: email });
    return user !== null;
  } catch (error) {
    console.error("Error checking user existence:", error);
    return false;
  }
});

// Function to save a new user to the database
//function saveUser(newUser) {

async function saveUser(newUser) {
  try {
    const user = new User(newUser);
    await user.save();

    console.log("User saved successfully");
    return user;
  } catch (error) {
    console.error("Error saving user:", error);

    throw new Error("Failed to save user");
  }
}
//res.send("User registration successful");

// Function to authenticate and login a user
async function loginUser(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Compare the provided password with the hashed password stored in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    // If the passwords don't match, return an error
    if (!passwordMatch) {
      return res.status(401).send("Invalid password");
    }

    res.send("User login successful");
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).send("Internal server error");
  }
}

function logoutUser(req, res) {
  // Logic to logout a user
  res.send("User logout successful");
}
function getUserProfile(req, res) {
  // Logic to get a profile
  res.send("Profile gotten");
}

function updateUserProfile(req, res) {
  // Logic to update user profile
  res.send("User profile updated successfully");
}

function placeOrder(req, res) {
  // app.post("/order", (req, res) => {
  const { customer, orderId, Address, phoneNo, status } = req.body;

  // Dummy logic to simulate order processing
  //const totalAmount = calculateTotalAmount(items);
  //const estimatedDeliveryTime = calculateDeliveryTime(deliveryMethod);

  const orderDetails = {
    customer: customer,
    orderId: orderId,
    Address: Address,
    phoneNo: phoneNo,
    status: status,
  };

  // Return order confirmation
  res.json({ message: "Order placed successfully", orderDetails });
}

function getOrder(req, res) {
  // Logic to retrieve order details
  res.send("Order details retrieved successfully");
}

function cancelOrder(req, res) {
  // Logic to cancel an order
  res.send("Order canceled successfully");
}

function addReview(req, res) {
  // Logic to add a new review
  res.send("Review added successfully");
}

function getReviews(req, res) {
  // Logic to retrieve reviews
  res.send("Reviews retrieved successfully");
}

function deleteReview(req, res) {
  // Logic to delete a review
  res.send("Review deleted successfully");
}

function adminDashboard(req, res) {
  // Logic to retrieve admin dashboard data
  res.send("Admin dashboard data retrieved successfully");
}

function manageUsers(req, res) {
  // Logic to retrieve and manage users (for admin)
  res.send("Users managed successfully");
}

function deleteUser(req, res) {
  // Logic to delete a user account (for admin)
  res.send("User deleted successfully");
}

function errorHandler(err, req, res, next) {
  // Error handling logic
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
}

module.exports = {
  home,
  vendors,
  customers,
  menu,
  contact,
  search,
  cuisines,
  explore,
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  placeOrder,
  getOrder,
  cancelOrder,
  addReview,
  getReviews,
  deleteReview,
  adminDashboard,
  manageUsers,
  deleteUser,
  errorHandler,
};
