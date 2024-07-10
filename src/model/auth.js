const { Schema, default: mongoose } = require("mongoose");

const userSchema = new Schema({
  email: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  imageUrl: { type: String, required: true },
  country: { type: String, required: true },
  city: { type: String, required: true },
  otp: { type: String, required: true },
  password: {
    type: String,
    required: true,
    validate: {
      validator: (value) => {
        return value.length >= 6;
      },
      message: "Password must be 6 character",
    },
  },
  role: { type: String, default: "user" },
  verified: { type: Boolean, default: false },
});

const IUser = mongoose.model("user", userSchema);

module.exports = IUser;
