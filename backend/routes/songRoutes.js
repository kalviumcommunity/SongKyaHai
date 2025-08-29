const express = require("express");
const router = express.Router();

// ✅ Correct import (with destructuring)
const { generateSongRecommendation } = require("../controllers/songController");

// ✅ Register route
router.post("/recommend", generateSongRecommendation);

module.exports = router;