const mongoose = require('mongoose')

const SubscriptionLinkSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    paymentId: {
        type: String,
        required: false,
    },
    paymentLink: {
        type: String,
        required: true,
    },
    paymentLinkId: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    paymentInitiatedTime: {
        type: Date,
        required: true,
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
    subscriptionType: {
        type: String,
        required: true,
    },
    paymentCompleted: {
        type: Boolean,
        required: true,
    },
    // hospital: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: false,
    // }
})

module.exports = mongoose.model('SubscriptionLink', SubscriptionLinkSchema)