const { sequelize, User } = require("./models");
const express = require("express");
const app = express();

app.use(express.json());

function errorHandler(res, error) {
  res.status(500).json({
    success: false,
    error,
  });
}

app.get("/user/:id", (req, res) => {
  try {
  } catch (error) {
    errorHandler(res, error);
  }
});

app.post("/user", async (req, res) => {
  try {
    const createdUser = await User.create(req.body);
    res.status(201).json({
      createdUser,
    });
  } catch (error) {
    errorHandler(res, error);
  }
});

app.listen(3000, async () => {
  console.log("Running");
  try {
    await sequelize.authenticate();
    console.log("Running");
  } catch (err) {
    console.log(err);
  }
});
