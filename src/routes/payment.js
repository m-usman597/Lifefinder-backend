const express = require('express');
const { makePayment, savePayment, makeSubscription, saveSubscription } = require('../controller/payment');
const router = express.Router();

router.post('/create-payment', makePayment);
router.post('/save-payment', savePayment);
router.post('/create-subscription', makeSubscription);
router.post('/save-subscription', saveSubscription);

module.exports = router;