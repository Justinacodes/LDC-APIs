const express = require("express");
const routerManager = express.Router();
const { login, register } = require("../controllers/auth")
const { restaurant } = require("../controllers/restaurants")
const { menu } = require("../controllers/menu")
const {contact} = require("../controllers/contact")
const {home} = require("../controllers/ctrl");

// Home page
routerManager.get("/", home);



//Vendor routes
routerManager.get("/restaurant", restaurant);
routerManager.post("/restaurant", restaurant);
routerManager.put("/restaurant:id", restaurant);


// Menu and search
routerManager.put("/menu/:id", menu);
routerManager.get("/menu/:id", menu);
routerManager.post("/menu/:id", menu);


// Contact
routerManager.put("/contact", contact);
routerManager.post("/contact", contact);
routerManager.get("/contact", contact);

// User authentication

routerManager.post("/auth/register", register)

routerManager.put("/auth/register", register)

routerManager.get("/auth/register", register)
routerManager.post("/auth/login", login);
routerManager.put("/auth/login", login);
routerManager.get("/auth/login", login);


// Error handling
//routerManager.use(errorHandler);

module.exports = { routerManager };
