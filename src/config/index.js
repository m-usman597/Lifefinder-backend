const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL;
const SECRET_KEY = process.env.SECRET_KEY;
const Google_App_Password = process.env.Google_App_Password;
const cloud_name = process.env.CLOUD_NAME;
const api_key = process.env.CLOUD_API_KEY;
const api_secret = process.env.CLOUD_SECRET_KEY;

module.exports = {
  PORT,
  MONGODB_URL,
  SECRET_KEY,
  Google_App_Password,
  cloud_name,
  api_key,
  api_secret,
};
