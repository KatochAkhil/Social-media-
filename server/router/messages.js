const express = require("express");
const router = express.Router();
const Message = require("../modal/message");

//add

router.post("/", async (req, res) => {
  const newMessage = new Message(req.body);
  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (error) {
    console.log(error);
  }
});

//get Messages

router.get("/:conversationId", async (req, res) => {
  try {
    const messages = await Message.find({
        conversationId:req.params.conversationId
    });
    res.status(200).json(messages);

  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
