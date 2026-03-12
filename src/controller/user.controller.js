const User = require("../Model/user");
const validator = require("validator");

const signUpUser = async (req, res) => {
  console.log(req.body);

  const { firstName, lastName, email, password, gender, age } = req.body;
  try {
    validator.isEmail(email) ||
      res.status(400).json({ message: "Invalid email format" });
    validator.isStrongPassword(password) ||
      res.status(400).json({
        message:
          "Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      });
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.error("Error creating user:", error.message);
    res
      .status(500)
      .json({ message: "Error creating user", error: error.message });
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
    const isAllupdate = Object.keys(req.body).every((update) =>
      allowedUpdates.includes(update),
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
  updateUser
};

