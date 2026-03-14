const User = require("../Model/user");
const validator = require("validator");
const bcrypt = require("bcrypt");
const { signUpDataValidator } = require("../utils/validation");

const signUpUser = async (req, res) => {
  // const { firstName, lastName, email, password, gender, age } = req.body;
  try {
    signUpDataValidator(req);

    const { firstName, lastName, email, password } = req.body;

    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).send("User with this email already exists");
    }

    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);

    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });
    await user.save();
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    res.status(500).send("ERROR: " + error.message);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid credentials" );
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid password" );
    }
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  const { id } = req.body;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User fetched successfully", user });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Error fetching user", error });
  }
};

const deleteUser = async (req, res) => {
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
};

const updateUser = async (req, res) => {
  const { id } = req.params;

  try {
    const allowedUpdates = [
      "firstName",
      "lastName",
      "password",
      "gender",
      "age",
    ];
    const isAllupdate = Object.keys(req.body).every((key) =>
      allowedUpdates.includes(key),
    );

    if (!isAllupdate) {
      return res.status(400).json({ message: "Invalid update fields" });
    }

    const updateUser = await User.findByIdAndUpdate(id, req.body);
    if (!updateUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res
      .status(200)
      .json({ message: "User updated successfully", user: updateUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Error updating user" + error.message });
  }
};

module.exports = {
  signUpUser,
  getAllUsers,
  deleteUser,
  updateUser,
  loginUser,
};
