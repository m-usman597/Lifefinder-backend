const { Schema, default: mongoose } = require('mongoose');

const contactSchema = new Schema({
    user_name: { type: String, required: true },
    user_email: { type: String, required: true },
    status: { type: String, required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Contact = mongoose.model("contact", contactSchema);
module.exports = Contact;