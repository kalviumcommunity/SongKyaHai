const express = require("express");
const router = express.Router();

// ✅ Correct import (with destructuring)
const { generateSongRecommendation, zeroShot, oneShot, multiShot, dynamicPrompt, stopSequence } = require("../controllers/songController");

// ✅ Register route
router.post("/recommend", generateSongRecommendation);
router.get("/zeroShot", zeroShot);
router.get("/oneShot", oneShot);
router.get("/multiShot", multiShot);
router.get("/dynamicPrompt", dynamicPrompt);
router.get("/stopSequence", stopSequence);

module.exports = router;