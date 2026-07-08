const session = require("express-session");
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const passport = require("passport");

require("./passport"); // we will create this next

const app = express();

// middlewares
app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 }
  })
);




app.use(passport.initialize());
app.use(passport.session());

// basic route check
app.get("/", (req, res) => {
  res.send("Server running OK ✅");
});

// routes (Google login routes will attach later)
app.use("/auth", require("./routes/auth"));

// connect mongo → then start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Mongo Connected Successfully");
    app.listen(process.env.PORT || 5000, () =>
      console.log("🚀 Server running on port", process.env.PORT)
    );
  })
  .catch((err) => console.log("Mongo Error:", err));
