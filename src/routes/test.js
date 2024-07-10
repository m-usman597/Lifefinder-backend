const express = require('express');

const {test} = require('../controller/test');

const testRoute = express.Router();

testRoute.post("/test",test);

module.exports = testRoute;