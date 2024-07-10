const express = require('express');
const {ContactUser} = require('../controller/contact');

const ContactRouter = express.Router();

ContactRouter.post('/contactAdmin',ContactUser);

module.exports = ContactRouter;