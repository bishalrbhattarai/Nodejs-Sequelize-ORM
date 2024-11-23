const { sequelize, User, Post } = require("./models");
const express = require("express");
const app = express();

app.use(express.json());

function errorHandler(res, error) {
  console.log(error);
  res.status(500).json({
    success: false,
    error,
  });
}

app.get("/user/:id", async (req, res) => {
  let { id } = req.params;
  if (!id) throw new Error("id not found");
  if (typeof id === "string") {
    id = Number(id);
  }
  try {
    const foundUser = await User.findByPk(id);

    res.status(200).json({
      success: true,
      foundUser,
    });
  } catch (error) {
    errorHandler(res, error);
  }
});

app.post("/post/:id", async (req, res) => {
  let { id } = req.params;
  const { content } = req.body;
  if (!id) throw new Error("id not found");
  if (typeof id === "string") {
    id = Number(id);
  }
  try {
    const foundUser = await User.findByPk(id);
    if (!foundUser)
      return res.status(400).json({
        success: false,
        message: "Such User Doesnot Exist.",
      });
    const createdPost = await Post.create({
      content,
      userId: foundUser.id,
    });

    res.status(200).json({
      success: true,
      createdPost,
    });
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
