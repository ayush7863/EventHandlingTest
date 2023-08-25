const express = require("express");
const { connection } = require("./db");
const { userRouter } = require("./routes/user.routes");
const cors = require("cors");
const app = express();
require("dotenv").config();
app.use(cors())
app.use(express.json());
app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Connected to MongoDB");
    console.log(`Server is running on port ${process.env.port}`);
  } catch (error) {
    console.log("Not able to Found");
    console.log(error);
  }
});
