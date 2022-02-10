const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");

const userRoute = require("./router/users");
const authRoute = require("./router/auth");
const postRoute = require("./router/posts");
const conversationRoute = require("./router/conversations");
const messagesRoute = require("./router/messages");

const app = express();
const path = require("path");

dotenv.config({ path: "./config.env" });
require("./database/connection");

app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});
const upload = multer({ storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File Uploaded Successfully");
  } catch (err) {
    console.log(err);
  }
});

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messagesRoute);

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log(`Server is working on Port No ${PORT}`);
});
