const express = require("express");
const hbs = require("express-handlebars");
const mongoose = require("mongoose");
const { routerManager } = require("./routes/rts");
const { errorConverter, errorHandler } = require("./middleware/errorHandler");
const config = require("./config/dbConnection");

const app = express();
const PORT = 5001;

app.engine(
  "hbs",
  hbs.engine({
    extname: "hbs",
    defaultLayout: "main",
    layoutDir: __dirname + "/views/layouts",
  })
);

app.set("view engine", "hbs");
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(errorHandler);
app.use(errorConverter);
app.use("/api/v1", routerManager);

const startApp = async () => {
  try {
    // Connect to the database
    await config.connectDb();
    console.log(`\x1b[32mDB:\x1b[0m MongoDB Connected`);
    console.log(`\x1b[36mServer:\x1b[0m Starting server...`);

    // Start the server
    app.listen(PORT, () => {
      console.log(`\x1b[36mServer:\x1b[0m Server started on port ${PORT}`);
    });
  } catch (error) {
    console.log(` ${error.message}`);
    //shutdown();
  }
};

startApp();
