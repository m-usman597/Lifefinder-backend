const express = require('express');
const {addReview,getReview} = require('../controller/review');

const reviewRouter = express.Router();

reviewRouter.post("/addReview", addReview);
reviewRouter.get("/getReviews/:clinic_id", getReview);

module.exports = reviewRouter;