const express = require("express");
const routerManager = express.Router();
const { login, register } = require("../controllers/auth")
const { restaurant } = require("../controllers/restaurants")
const { menu } = require("../controllers/menu")
const {contact} = require("../controllers/contact")
const {home} = require("../controllers/ctrl");

// Home page
routerManager.get("/api/v1", home);


//Vendor routes
routerManager.get("/restaurant", restaurant);
routerManager.post("/restaurant", restaurant);
routerManager.put("/restaurant:id", restaurant);


// Menu and search
routerManager.put("/menu/:id", menu);


// Contact
routerManager.put("/contact", contact);

// User authentication

routerManager.post("/auth/register", register)
routerManager.post("/auth/login", login);


// Error handling
//routerManager.use(errorHandler);

module.exports = { routerManager };
