const Review = require("../../model/review");

const addReview = async (req, res) => {
  const {
    user_id,
    clinic_id,
    userName,
    comment,
    stars,
    treatmentType,
    treatmentDate,
  } = req.body;

  try {
    const newReview = new Review({
      user_id,
      clinic_id,
      userName,
      comment,
      treatmentType,
      treatmentDate,
      stars,
      createdAt: new Date(),
    });
    newReview.save();
    res.status(200).json({ message: "Review Added Successfully" });
  } catch (error) {
    res.status(401).json({ message: "failed to add review" });
    console.log("Error in Adding Review: ", error);
  }
};

const getReview = async (req, res) => {
  const { clinic_id } = req.params;

  try {
    const reviews = await Review.find({ clinic_id: clinic_id });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(401).json({ message: "failed to get reviews" });
    console.log("Error in Fetching Reviews");
  }
};

module.exports = { addReview, getReview };
