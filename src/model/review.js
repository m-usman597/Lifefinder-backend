const { Schema, default: mongoose } = require("mongoose");

const ReviewSchema = new Schema({
  user_id: { type: String, required: true },
  clinic_id: { type: String, required: true },
  userName: { type: String, required: true },
  treatmentType: { type: String, required: true },
  treatmentDate: { type: Date, required: true },
  comment: { type: String, required: true },
  stars: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Review = mongoose.model("review", ReviewSchema);

module.exports = Review;
