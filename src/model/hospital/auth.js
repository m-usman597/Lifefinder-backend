const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const availabilitySchema = new Schema({
  day: {
    type: String,
    required: true,
  },
  times: {
    type: [String],
    required: true,
  },
});

const serviceSchema = new Schema({
  serviceName: {
    type: String,
    trim: true,
  },
  servicePrice: {
    type: String,
    trim: true,
  },
  availability: {
    type: Map,
    of: [String],
  },
});

const contactDetailsSchema = new Schema({
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
});

const HospitalSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  services: {
    type: [serviceSchema],
    required: true,
  },
  countryCode: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    required: true,
    trim: true,
  },
  contact_details: {
    type: contactDetailsSchema,
    required: true,
  },
  role: {
    type: String,
    default: "adminmain",
    trim: true,
  },
  ratingCount: {
    type: Number,
    default: 0,
  },
  subscribed: {
    type: Boolean,
    default: false,
  },
  subscriptonId: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
  },
  subscriptionLinkId: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
  },
});

const IHospital = mongoose.model("clinic", HospitalSchema);
module.exports = IHospital;
