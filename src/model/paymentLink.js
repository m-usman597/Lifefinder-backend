const mongoose = require('mongoose')

const PaymentSchema = new mongoose.Schema({
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
    // products: {
    //     type: [{ id: mongoose.Schema.Types.ObjectId, code: String, title: String, price: Number, qty: Number, image: String }],
    //     required: true,
    // },
    paymentCompleted: {
        type: Boolean,
        required: true,
    },
    hospital: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    service: {
        type: { serviceName: String, serviceDate: String, serviceDescription: String, serviceTiming: String },
        required: true,
    }
})

module.exports = mongoose.model('PaymentLink', PaymentSchema)