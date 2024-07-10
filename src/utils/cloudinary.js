const cloudinary = require("cloudinary").v2;
const { api_key, api_secret, cloud_name } = require("../config");

cloudinary.config({
  cloud_name,
  api_key,
  api_secret,
});

const options = {
  use_filename: true,
  unique_filename: false,
  overwrite: true,
};

const uploadImageCloudinary = async (image) => {
  try {
    const result = await cloudinary.uploader.upload(`${image}`, options);
    const secureURL = result.secure_url;
    return secureURL;
  } catch (error) {
    throw error;
  }
};

module.exports = uploadImageCloudinary;
