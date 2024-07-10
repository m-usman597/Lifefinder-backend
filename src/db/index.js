const mongoose = require("mongoose");
const { MONGODB_URL } = require("../config");
mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.log("🚀 ~ DB connected!");
  })
  .catch(() => {
    console.log("🚀 ~ file: index.ts:8 ~ mongoose.connect ~ DB NotConnected!:");
  });