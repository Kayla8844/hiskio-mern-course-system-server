const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const authRoute = require("./routes").auth;
const courseRoute = require("./routes").course;

const passport = require("passport");
require("./config/passport")(passport);

// 連接資料庫網址 (mongodb atlas)
mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connect to mongodb atlas");
  })
  .catch((err) => {
    console.log(err);
  });

// middlewares
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", authRoute); // /api 為了 react 使用方便

// course route 需要登入才能進
app.use(
  "/api/courses",
  passport.authenticate("jwt", { session: false }),
  courseRoute
);

app.listen(8080, () => {
  console.log("Server running on port 8080.");
});
