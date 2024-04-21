const express = require("express"); //import express
const hbs = require("express-handlebars");

// const mongoose = require("mongoose")

const app = express(); 
// //const bodyParser = require("body-parser");
// mongoose.connect(
//   'mongodb+srv://justinaominisan:456198@ldccluster.ffgnac9.mongodb.net'
// );
// const userSchema = new mongoose.Schema({
//   name: String,
//   age: Number
// })
// const UserModel = mongoose.model("users", userSchema)
// app.get('/', (req, res) => {
//   UserModel.find({}).then(function (users) {
//     res.json(users)
//   }).catch(function (err) {
//     console.log(err)
//   })
// })
const { routerManager } = require("./routes/rts");
const { errorHandler } = require("./controllers/ctrl");

//const cors = require("cors");
const port = 5001; //port number

//connectDb();
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

// app.get("/", (req, res) => {
//   res.send("Home");
// });
app.use("/", routerManager);

app.use(errorHandler);
//app.use(connect)
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
