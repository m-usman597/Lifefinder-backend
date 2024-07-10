// Backend: getMessagesBySenderAndRecipient
const IMessaging = require("../../model/messaging");

const getMessagesBySenderAndRecipient = async (req, res) => {
  const { sender_id, recipient_id } = req.query;

  try {
    const messages = await IMessaging.find({
      $or: [
        { sender_id, recipient_id },
        { sender_id: recipient_id, recipient_id: sender_id },
      ],
    }).sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const deleteMessageById = async (req, res) => {
  const { id } = req.params;
  console.log("🚀 ~ deleteMessageById ~ _id:", id);
  try {
    if (!id) {
      return res.status(401).send({ message: "Id does not Provided" });
    }
    const response = await IMessaging.deleteOne({ _id: id });
    res.send({ message: " message delete successfully", data: response });
  } catch (err) {
    console.log("🚀 ~ deleteMessageById ~ err:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

const editMessageById = async (req, res) => {
  const { id } = req.params;
  const { message } = req.body;

  console.log("🚀 ~ editMessageById ~ id:", id);
  console.log("🚀 ~ editMessageById ~ message:", message);

  try {
    if (!id || !message) {
      return res.status(401).send({ message: "Id or message not provided" });
    }

    const response = await IMessaging.updateOne(
      { _id: id },
      { $set: { message } }
    );

    res.send({ message: "Message edited successfully", data: response });
  } catch (err) {
    console.log("🚀 ~ editMessageById ~ err:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getMessagesBySenderAndRecipient,
  deleteMessageById,
  editMessageById,
};
