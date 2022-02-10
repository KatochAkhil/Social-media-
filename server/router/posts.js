const express = require("express");
const router = express.Router();
const Post = require("../modal/post");
const User = require("../modal/users");
//create a post
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    console.log(err);
  }
});

//update a post

router.put("/:id", async (req, res) => {
  try {
    const post = Post.findById(req.params.id);
    if (post.userId === req.params.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("Post Updated Successfully");
    } else {
      res.status(403).json("You Can update only your Post");
    }
  } catch (err) {
    console.log(err);
  }
});

//delete a post

router.delete("/:id", async (req, res) => {
  try {
    const post = Post.findById(req.params.id);
    if (post.userId === req.params.userId) {
      await post.deleteOne();
      res.status(200).json("Deleted Successfull");
    } else {
      res.status(403).json("You Can delete only your Post");
    }
  } catch (err) {
    console.log(err);
  }
});

//like a post    

router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.params.userId } });
      res.status(200).json("Post Has been Liked");
    } else {
      await post.updateOne({ $pull: { likes: req.params.userId } });
      res.status(200).json("Post Has been DisLiked");
    }
  } catch (err) {
    console.log(err);
  }
});

//get a post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    console.log(err);
  }
});

//get timeline posts

router.get("/timeline/:userId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const userPost = await Post.find({ userId: currentUser._id });
    const friendPost = await Promise.all(
      currentUser.following.map((friendId) => {
        Post.find({ userId: friendId });
      })
    );
    res.json(userPost.concat(...friendPost));
  } catch (err) {
    console.log(err);
  }
});
//get Users all Posts

router.get("/profile/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    const posts = await Post.find({ userId: user._id });
    console.log(posts);
    console.log(user);
    res.status(200).json(posts);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
