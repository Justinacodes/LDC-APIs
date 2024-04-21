const express = require("express");
const routerManager = express.Router();
const {
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
} = require("../controllers/ctrl");

// Home page
routerManager.get("/", home);

//Vendor routes
routerManager.get("/vendors", vendors);
routerManager.post("/vendors", vendors);
routerManager.put("/vendors", vendors);
routerManager.get("/vendors", vendors);
routerManager.get("/customers", customers);

// Menu and search
routerManager.get("/menu", menu);
routerManager.get("/search", search); 
routerManager.post("/cuisines", cuisines);
routerManager.get("/explore", explore);

// Contact
routerManager.get("/contact", contact);

// User authentication
routerManager.post("/auth/register", registerUser);
routerManager.get("/auth/register", registerUser);
routerManager.post("/auth/login", loginUser);
routerManager.post("/auth/logout", logoutUser);

// User profile
routerManager.get("/profile", getUserProfile);
routerManager.put("/profile", updateUserProfile);

// Order management
routerManager.post("/orders", placeOrder);
routerManager.get("/orders", placeOrder);
routerManager.get("/orders/:orderId", getOrder);
routerManager.put("/orders/:orderId/cancel", cancelOrder);

// Review and rating
routerManager.post("/reviews", addReview);
routerManager.get("/reviews/:restaurantId", getReviews);
routerManager.delete("/reviews/:reviewId", deleteReview);

// Admin management
routerManager.get("/admin/dashboard", adminDashboard);
routerManager.get("/admin/users", manageUsers);
routerManager.delete("/admin/users/:userId", deleteUser);

// Error handling
routerManager.use(errorHandler);

module.exports = { routerManager };
