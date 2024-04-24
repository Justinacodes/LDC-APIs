const express = require("express");
const routerManager = express.Router();
const { login, register } = require("../controllers/auth")
const { restaurant } = require("../controllers/restaurants")
const { menu } = require("../controllers/menu")
const {contact} = require("../controllers/contact")
//const { product } = require("../models/productUpload")
const {home} = require("../controllers/ctrl");

// Home page
routerManager.get("/", home);

//Vendor routes
routerManager.get("/restaurant", restaurant);
routerManager.post("/restaurant", restaurant);
routerManager.put("/restaurant", restaurant);


// Menu and search
routerManager.put("/menu", menu);


// Contact
routerManager.get("/contact", contact);
routerManager.put("/contact", contact);

// User authentication

routerManager.put("/auth/register", register)
routerManager.get("/login", login);
routerManager.put("/login", login);






// Error handling
//routerManager.use(errorHandler);

module.exports = { routerManager };
