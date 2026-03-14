const validator = require("validator");

const signUpDataValidator = (req) => {
  const { firstName, lastName, email, password, age } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Please enter first and last name");
  } else if (
    firstName.length < 4 ||
    lastName.length < 4 ||
    firstName.length > 20 ||
    lastName.length > 20
  ) {
    throw new Error(
      "First and last name must be between 4 and 20 characters long",
    );
  } else if (!validator.isEmail(email)) {
    throw new Error("Please enter a valid email");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter a strong password with at least 6 characters, including uppercase, lowercase, number, and special character");
  }else if (age< 18 || age > 100) {
    throw new Error("Please enter a valid age between 18 and 100");
  }
};

module.exports = {
  signUpDataValidator,
};
