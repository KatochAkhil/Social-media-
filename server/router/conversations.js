const router = require("express").Router();
const Conversation = require("../modal/conversation");

//new conv

router.post("/", async (req, res) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });
  console.log(newConversation);

  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get conv of a user
router.get("/:userId", async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    console.log(conversation);
    res.status(200).json(conversation);
  } catch (error) {
    console.log(error);
  }
});

// get conv includes two userId

module.exports = router;
