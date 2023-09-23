// define express
const express = require("express");

// create app
const app = express();

// define mongoose
const mongoose = require("mongoose");

// define cors
const cors = require("cors");

// create new Model -> User
const UserModel = require("./models/Users");

// connect vs with database
mongoose.connect(
  "mongodb+srv://saeedaltout:xpVaKBRwxAbU3pyA@cluster0.w2bke9k.mongodb.net/mern?retryWrites=true&w=majority"
);

// use corsOption to fix fetch data
app.use(cors());

// use express.json() to fix send data
app.use(express.json());

// get data and put in root -> /users
app.get("/users", async (req, res) => {
  const users = await UserModel.find();
  res.json(users);
});

// send data and put in root -> /create
app.post("/create", async (req, res) => {
  const newUesr = new UserModel(req.body);
  await newUesr.save();
  res.json(req.body);
});

// create server ->localhost:3001 -> /
app.listen("3001", () => {
  console.log("Server Working !!");
});
