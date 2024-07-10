const { Schema, model } = require("mongoose");

const messageSchema = new Schema({
    sender_id: { type: String, required: true },
    recipient_id: { type: String, required: true },
    message: { type: String },
    image: { type: String },
    uploadimage: { type: String }
}, { timestamps: true });

const IMessaging = model("message", messageSchema);

module.exports = IMessaging;
