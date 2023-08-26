const express = require("express");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../model/user.model");

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  const { email, name } = req.body;
  let user = await UserModel.findOne({ email });
  try {
    if (!user) {
      user = new UserModel({ email, name });
      await user.save();
      res.status(200).send("Registration Successfully!");
    } else {
      res.status(201).send("This User already exists");
    }
  } catch (error) {
    res.status(400).send("Registration Failed!");
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, name } = req.body;
  //   console.log(email)
  try {
    const user = await UserModel.find({ email });
    // console.log(user.length)
    if (user.length > 0) {
      const token = jwt.sign({ course: "backend" }, "ayush");
      res.status(200).send({ msg: "Login Successful", token: token });
    } else {
      res.status(400).send({ error: "Wrong Credentials" });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = {
  userRouter,
};
