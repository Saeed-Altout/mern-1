const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

app.use(cors());
app.use(express.json());

const UserModel = require("./models/Users");

app.listen(process.env.PORT, () => {
  console.log("Server Working !!");
});

mongoose.connect(
  `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster0.w2bke9k.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`
);

app.get("/users", async (req, res) => {
  const users = await UserModel.find();
  res.json(users);
});

app.post("/register", async (req, res) => {
  const { username, email, password } = await req.body;

  // check from user
  const user = await UserModel.findOne({ username });
  if (user) {
    return res.json({ message: "The user already exists, please try again." });
  }

  //hashing password
  const hashPassword = bcrypt.hashSync(password, 10);

  //create new user in db
  const newUser = new UserModel({
    username,
    email,
    password: hashPassword,
  });

  newUser?.save();
  return res.json({
    message: "The creation of a new user has been registered successfully.",
  });
});

app.post("/login", async (req, res) => {
  const { username, password } = await req.body;

  // check from user
  const user = await UserModel.findOne({ username });

  if (!user) {
    return res.json({ message: "The user not found, please try again." });
  }

  //hashing password
  const hashPassword = bcrypt.hashSync(password, 10);

  // check from correct password
  const passwordIsCorrect = bcrypt.compare(hashPassword, user.password);
  if (!passwordIsCorrect) {
    return res.json({
      message: "Username or password is incorrect, please try again.",
    });
  }

  const token = jwt.sign({ id: user._id }, process.env.SECRET);

  return res.json({
    username,
    password: hashPassword,
    token,
    userID: user._id,
  });
});
