const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./Config/database");
const User = require("./Model/user");
dotenv.config();
const APP_PORT = process.env.APP_PORT || 3000;

const app = express();

app.use(express.json());

app.post("/user", async (req, res) => {
  console.log(req.body);

  // const { firstName, lastName, email, password, gender, age } = req.body;
  // console.log(firstName, lastName, email, password, gender, age);
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Error creating user", error });
  }
});

app.delete("/user/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res
      .status(200)
      .json({ message: "User deleted successfully", user: deletedUser });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Error deleting user", error });
  }
});

app.patch("/user/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const updateUser = await User.findByIdAndUpdate(id, req.body);
    if (!updateUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res
      .status(200)
      .json({ message: "User updated successfully", user: updateUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Error updating user", error });
  }
});
connectDB()
  .then(() => {
    console.log("Database connected successfully....");
    app.listen(APP_PORT, () => {
      console.log(`Server is running on port ${APP_PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });
