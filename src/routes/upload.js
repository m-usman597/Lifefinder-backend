const { uploadImage } = require("../controller/upload");
const uploadImageMulter = require("../utils/multer");
const express = require("express");
const upload = express.Router();

upload.post("/upload", uploadImageMulter.single("file"), uploadImage);

module.exports = upload;
