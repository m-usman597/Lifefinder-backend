const mongoose = require('mongoose')

const SubscriptionSchema = new mongoose.Schema({
    paymentLink: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    stripeEmail: {
        type: String,
        required: true,
    },
    paymentId: {
        type: String,
        required: true,
    },
    paymentLinkId: {
        type: String,
        required: true,
    },
    paymentMethodId: {
        type: String,
        required: true,
    },
    subscriptionId: {
        type: String,
        required: true,
    },
    customerId: {
        type: String,
        required: true,
    },
    invoiceId: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    paymentInitiatedTime: {
        type: Date,
        required: false,
    },
    paymentSuccessTime: {
        type: Date,
        required: false,
    },
    date: {
        type: Date,
        required: true,
        default: Date.now,
    },
    paymentCompleted: {
        type: Boolean,
        required: true,
    },
    subscriptionType: {
        type: String,
        required: true,
    },
    subscriptionExpiry: {
        type: Date,
        required: true,
    },
    renewalHistory: {
        type: [{ renewalDate: Date, subscriptionStart: Date, subscriptionEnd: Date }],
        required: false,
    },
    // hospital: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    // }
})

module.exports = mongoose.model('Subscription', SubscriptionSchema)