const mongoose = require('mongoose')

const PaymentSchema = new mongoose.Schema({
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
    amount: {
        type: Number,
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
        // type: { hospitalId: mongoose.Schema.Types.ObjectId, hospitalAddress: String, hospitalName: String, hospitalEmail: String },
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    service: {
        type: { serviceName: String, serviceDate: String, serviceDescription: String, serviceTiming: String },
        required: true,
    }
})

module.exports = mongoose.model('Payment', PaymentSchema)