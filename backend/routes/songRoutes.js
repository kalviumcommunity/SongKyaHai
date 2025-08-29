const express = require("express");
const router = express.Router();

// ✅ Correct import (with destructuring)
const { generateSongRecommendation, oneShot } = require("../controllers/songController");

// ✅ Register route
router.post("/recommend", generateSongRecommendation);
router.get("/oneShot", oneShot);

module.exports = router;