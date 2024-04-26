const express = require("express");
const hbs = require("express-handlebars");
const mongoose = require("mongoose");
const { routerManager } = require("./routes/rts");
const { errorConverter, errorHandler } = require("./middleware/errorHandler");
const config = require("./config/dbConnection");

const app = express();
const PORT = process.env.PORT || 5001; // Use environment variable for port if available

const { initializeApp } =require("firebase/app");
const { getAnalytics } = require("firebase/analytics");

const firebaseConfig = {
  apiKey: "AIzaSyA7wQiX4E2PuPY-ZVtes4cZSBPB7Ce_DlQ",
  authDomain: "localdishcorner-c4dca.firebaseapp.com",
  projectId: "localdishcorner-c4dca",
  storageBucket: "localdishcorner-c4dca.appspot.com",
  messagingSenderId: "697599555970",
  appId: "1:697599555970:web:2688716a214f9ded4ff79b",
  measurementId: "G-Q2MVL5S2P4",
};

const appF = initializeApp(firebaseConfig);
const analytics = getAnalytics(appF);

// View engine setup
app.engine(
  "hbs",
  hbs.engine({
    extname: "hbs",
    defaultLayout: "main",
    layoutsDir: __dirname + "/views/layouts",
  })
);
app.set("view engine", "hbs");

// Middleware
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.use("/api/v1", routerManager);

// Error handling middleware
app.use(errorConverter);
app.use(errorHandler);

// Start the application
const startApp = async () => {
  try {
    // Connect to the database
    await config.connectDb();
    console.log("\x1b[32mDB:\x1b[0m MongoDB Connected");

    // Start the server
    app.listen(PORT, () => {
      console.log(`\x1b[36mServer:\x1b[0m Server started on port ${PORT}`);
    });
  } catch (error) {
    console.error("\x1b[31mError:\x1b[0m", error);
    process.exit(1); // Exit with failure
  }
};

startApp();
