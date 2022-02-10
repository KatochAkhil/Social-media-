const express = require("express");
const router = express.Router();
const User = require("../modal/users");
const bcrypt = require("bcrypt");
//update user
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        console.log(err);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Account has been Updated");
    } catch (err) {
      console.log(err);
    }
  } else {
    return res.status(400).json("You can not update account");
  }
});
//delete user

router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Account has been Deleted");
    } catch (err) {
      console.log(err);
    }
  } else {
    return res.status(400).json("You can not Delete account");
  }
});

//get a user

router.get("/", async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.userName;

  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });
    const { password, updatedAt, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    console.log(err);
  }
});

//get Friends

router.get("/friends/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const friends = await Promise.all(
      user.following.map((friendId) => {
        return User.findById(friendId);
      })
    );
    let friendList = [];
    friends.map((friend) => {
      const { _id, userName, profileImage } = friend;
      friendList.push({ _id, userName, profileImage });
    });
    res.status(500).json(friendList);
  } catch (error) {
    console.log(error);
  }
});

//follow a user

router.put("/:id/follow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { following: req.params.id } });
        res.status(200).json("User has been Followed");
      } else {
        res.status(400).json("Already Follower");
      }
    } catch (err) {
      console.log(err);
    }
  } else {
    res.status(400).json("You Can'nt Follow Your Self");
  }
});

//unfollow a user

router.put("/:id/unfollow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { following: req.params.id } });

        res.status(200).json("User has been unFollowed");
      } else {
        res.status(400).json("Already UnFollow");
      }
    } catch (err) {
      console.log(err);
    }
  } else {
    res.status(400).json("You Can'nt UnFollow Your Self");
  }
});

module.exports = router;
