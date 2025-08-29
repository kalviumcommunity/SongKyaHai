const express = require("express");
const router = express.Router();

// ✅ Correct import (with destructuring)
const { generateSongRecommendation, oneShot, multiShot } = require("../controllers/songController");

// ✅ Register route
router.post("/recommend", generateSongRecommendation);
router.get("/oneShot", oneShot);
router.get("/multiShot", multiShot);

module.exports = router;