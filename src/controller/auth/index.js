const bcrypt = require("bcrypt");
const IUser = require("../../model/auth");
const { generateToken, generateOTP } = require("../../utils/jwt");
const sendEmail = require("../../utils/sendOtp");
const IHospitals = require("../../model/hospital/auth");

const register = async (req, res) => {
  const { email, fisrtName, lastName, password, city, country } = req.body;
  try {
    const existingUser = await IUser.findOne({ email });
    if (existingUser) {
      return res.status(401).send({ message: "User Already Exists" });
    }

    const hospital = await IHospitals.findOne({ email });
    if (hospital) {
      return res.status(401).send({
        message:
          "User Already Exists as Hospital you can use the another Email Address",
      });
    }
    // Password will be hashed
    const hashedPassword = await bcrypt.hash(password, 10);
    // Generate otp by default
    const otp = generateOTP();
    const imageUrl =
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/480px-User-avatar.svg.png";
    const newUser = new IUser({
      email,
      fisrtName,
      lastName,
      password: hashedPassword,
      otp,
      imageUrl,
      city,
      country,
    });
    const user = await newUser.save();

    if (!user) {
      return res.status(401).send({ message: "User Registration Failed" });
    }

    return res.status(201).send({ user });
  } catch (error) {
    console.log("🚀 ~ register ~ error:", error);
    return res.status(500).send({ message: "Server Error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await IUser.findOne({ email });

    if (!user) {
      return res.status(401).send({
        message:
          "Invalid email or password. Please check your credentials and try again.",
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send({
        message:
          "Invalid email or password. Please check your credentials and try again.",
      });
    }

    const token = await generateToken(user.password);

    return res.status(200).send({ token, user });
  } catch (error) {
    console.log("🚀 ~ login ~ error:", error);
    return res.status(500).send({
      message:
        "An error occurred while processing your request. Please try again later.",
    });
  }
};

const sendOTP = async (req, res) => {
  const { email } = req.body;
  console.log("🚀 ~ sendOTP ~ email:", email);
  try {
    const user = await IUser.findOne({ email });
    console.log("🚀 ~ sendOTP ~ user:", user);

    if (!user) {
      return res.status(401).send({ message: "User Not Found" });
    }

    const otp = generateOTP();
    user.otp = otp;
    await user.save();

    await sendEmail(user.email, "Your OTP Code", `Your OTP code is ${otp}`);
    const token = await generateToken(user.password);

    return res.status(200).send({ message: "OTP Sent", token });
  } catch (error) {
    console.log("🚀 ~ sendOTP ~ error:", error);
    return res.status(500).send({ message: "Server Error" });
  }
};

const verifyOTP = async (req, res) => {
  const { otp, token } = req.body;
  try {
    const user = await IUser.findOne({ otp });

    if (!user) {
      return res.status(401).send({ message: "Please Enter the Correct Otp" });
    }

    if (user.otp !== otp) {
      return res.status(401).send({ message: "Invalid OTP" });
    }

    const newOtp = generateOTP();
    user.otp = newOtp;
    user.verified = true;
    await user.save();

    return res.status(200).send({ message: "OTP Verified", success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Server Error" });
  }
};

const updatePassword = async (req, res) => {
  const { email, newPassword } = req.body;
  try {
    const user = await IUser.findOne({ email });

    if (!user) {
      return res.status(401).send({ message: "User Not Found" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    return res.status(200).send({ message: "Password Updated", user: user });
  } catch (error) {
    return res.status(500).send({ message: "Server Error" });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await IUser.findById(id).select("-password");
    if (!user) {
      return res.status(404).send({ message: "User Not Found" });
    }
    return res.status(200).send({ result: user });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Server Error" });
  }
};

const updateUserById = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, imageUrl, city, country } = req.body;
  try {
    const user = await IUser.findById(id);
    if (!user) {
      return res.status(404).send({ message: "User Not Found" });
    }

    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (imageUrl) user.imageUrl = imageUrl;
    if (city) user.city = city;
    if (country) user.country = country;

    await user.save();

    return res.status(200).send({ message: "User Updated", user });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Server Error" });
  }
};

const getOnlyAdmins = async (req, res) => {
  try {
    const admins = await IUser.find({ role: "admin" });
    return res.status(200).send({ admins });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Server Error" });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await IUser.find({ role: "user" });
    return res.status(200).send({ users });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Server Error" });
  }
};

const OnlySendOtp = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await IUser.findOne({ email });

    const otp = generateOTP();
    user.otp = otp;
    await user.save();

    await sendEmail(user.email, "Your OTP Code", `Your OTP code is ${otp}`);
    const token = await generateToken(user.password);

    return res.status(200).send({ message: "OTP Sent", token: token });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Server Error" });
  }
};

module.exports = {
  login,
  register,
  getOnlyAdmins,
  sendOTP,
  verifyOTP,
  updatePassword,
  getUserById,
  updateUserById,
  getUsers,
  OnlySendOtp,
};
