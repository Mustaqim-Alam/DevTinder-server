
const express = require("express");
const router = express.Router();
const {
  signUpUser,
  getAllUsers,
  deleteUser,
  updateUser,
} = require("../controller/user.controller");

router.post("/", signUpUser);
router.get("/", getAllUsers);
router.delete("/:id", deleteUser);
router.patch("/:id", updateUser);

module.exports = {
  router,
};
