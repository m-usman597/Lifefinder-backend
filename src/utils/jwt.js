const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");

const generateToken = async (password) => {
  return jwt.sign({ password }, SECRET_KEY, {
    expiresIn: "2h",
  });
};
function generateOTP() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

module.exports = {
  generateOTP,
  generateToken,
};
