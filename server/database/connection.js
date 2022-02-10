const mongoose = require("mongoose");
const DB = process.env.DB;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => console.log(err));
