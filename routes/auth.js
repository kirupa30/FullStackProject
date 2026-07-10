// server/routes/auth.js

const express = require("express");
const passport = require("passport");
const axios = require("axios");
const History = require("../models/History");

const router = express.Router();

// GOOGLE LOGIN START
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// GOOGLE CALLBACK
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/auth/failure", session: true }),
  (req, res) => {
    const frontend = process.env.FRONTEND_URL || "http://localhost:3000";
    res.redirect(frontend + "/home");
  }
);

// FAILURE
router.get("/failure", (req, res) => {
  res.status(401).send("Authentication Failed");
});

// CURRENT LOGGED USER
router.get("/me", (req, res) => {
  if (!req.user) return res.status(401).json({ ok: false, message: "Not authenticated" });

  const { _id, provider, displayName, email, photo } = req.user;
  res.json({ ok: true, user: { id: _id, provider, displayName, email, photo } });
});

// LOGOUT
router.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) return next(err);
    req.session = null;
    const frontend = process.env.FRONTEND_URL || "http://localhost:3000";
    res.redirect(frontend);
  });
});

// UNSPLASH SEARCH ROUTE
router.get("/search", async (req, res) => {
  if (!req.user) return res.status(401).json({ ok: false, message: "Not authenticated" });

  const query = req.query.query;

  try {
    const response = await axios.get(
      `https://api.unsplash.com/search/photos?query=${query}&client_id=${process.env.UNSPLASH_ACCESS_KEY}`
    );

    res.json({ ok: true, results: response.data.results });
  } catch (err) {
    console.log("Unsplash error", err);
    res.status(500).json({ ok: false, message: "Unsplash API error" });
  }
});

// SAVE HISTORY
router.post("/save-history", async (req,res)=>{
  if(!req.user) return res.status(401).json({ok:false,message:"Not authenticated"});
  
  const { keyword, images } = req.body;

  const newHistory = new History({
    userId:req.user._id,
    keyword,
    selectedImages: images
  });

  await newHistory.save();
  res.json({ok:true,message:"Saved Successfully"});
});

// GET HISTORY
router.get("/get-history", async (req,res)=>{
  if(!req.user) return res.status(401).json({ok:false,message:"Not authenticated"});

  const list = await History.find({userId:req.user._id}).sort({createdAt:-1});
  res.json({ok:true,history:list});
});

module.exports = router;
