const IHospitals = require("../../model/hospital/auth");
const IUser = require("../../model/auth");
const { hospitalSchema } = require("../../utils/validationSchema");
const bcrypt = require("bcrypt");
const { generateToken } = require("../../utils/jwt");

// Register a new hospital
const registerHospital = async (req, res) => {
  const {
    title,
    email,
    password,
    services,
    countryCode,
    address,
    description,
    image,
    phone,
  } = req.body;
  console.log("🚀 ~ registerHospital ~ name:", title);

  const { error } = hospitalSchema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ message: `Validation error: ${error.details[0].message}` });
  }

  let hospitalExists = await IHospitals.findOne({ email });
  if (hospitalExists) {
    return res.status(400).json({
      message:
        "This email is already registered with our hospital services. Please use a different email.",
    });
  }

  // Check if email exists in user model
  let userExists = await IUser.findOne({ email });
  if (userExists) {
    return res.status(400).json({
      message:
        "This email is already registered as a user. Please use a different email for hospital or log in.",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const contact_details = {
    phone: phone,
    email: email,
  };
  const ratingCount = 0;
  try {
    const newHospital = new IHospitals({
      title,
      email,
      password: hashedPassword,
      services,
      countryCode,
      address,
      description,
      image,
      contact_details,
      ratingCount,
    });

    const savedHospital = await newHospital.save();
    res.status(201).json(savedHospital);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Failed to register hospital: ${error.message}` });
  }
};

const loginHospital = async (req, res) => {
  const { email, password } = req.body;
  try {
    const hospital = await IHospitals.findOne({ email });

    // Check if hospital exists
    if (!hospital) {
      return res.status(401).json({
        message:
          "The email or password you entered is incorrect. Please check and try again.",
      });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, hospital.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message:
          "The email or password you entered is incorrect. Please check and try again.",
      });
    }

    // Generate token for authentication
    const token = await generateToken(hospital.password);

    // Return success response with token and hospital data
    return res
      .status(200)
      .json({ message: "Login successful", token, hospital });
  } catch (error) {
    console.log("🚀 ~ loginHospital ~ error:", error);
    // Handle server errors
    return res.status(500).json({
      message: "An unexpected error occurred. Please try again later.",
    });
  }
};

// Get all hospitals
const getAllHospitals = async (req, res) => {
  try {
    const hospitals = await IHospitals.find();
    res.status(200).json(hospitals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get hospital by ID
const getHospitalById = async (req, res) => {
  const { id } = req.params;
  console.log("🚀 ~ getHospitalById ~ id:", id);

  try {
    const hospital = await IHospitals.findById(id).select("-password");
    if (!hospital) {
      return res.status(404).json({ message: "Hospital not found" });
    }
    res.status(200).json({ result: hospital });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update hospital by ID
const updateHospitalById = async (req, res) => {
  const { id } = req.params;
  const updateFields = req.body;

  try {
    const updatedHospital = await IHospitals.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true }
    );
    if (!updatedHospital) {
      return res.status(404).json({ message: "Hospital not found" });
    }
    res.status(200).json(updatedHospital);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete hospital by ID
const deleteHospitalById = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedHospital = await IHospitals.findByIdAndDelete(id);
    if (!deletedHospital) {
      return res.status(404).json({ message: "Hospital not found" });
    }
    res.status(200).json({ message: "Hospital deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatePassword = async (req, res) => {
  const { email, newPassword } = req.body;
  try {
    const user = await IHospitals.findOne({ email });

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

module.exports = {
  registerHospital,
  loginHospital,
  getAllHospitals,
  getHospitalById,
  updateHospitalById,
  deleteHospitalById,
  updatePassword,
};
