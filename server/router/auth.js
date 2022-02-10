const express = require("express");
const router = express.Router();
const Users = require("../modal/users");
const bcrypt = require("bcrypt");
//register
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const newuser = await new Users({
      userName: req.body.userName,
      email: req.body.email,
      password: hashPassword,
    });
    const user = await newuser.save();
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
});

//login

router.post("/login", async (req, res) => {
  try {
    const user = await Users.findOne({ email: req.body.email });
    !user && res.status(400).send("User Not Found");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !validPassword && res.status(400).send("Wrong password");

    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
