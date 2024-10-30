const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movieController");
const auth = require("../middlewares/auth"); // JWT authentication

router.post("/upload", auth.verifyToken, movieController.uploadMovie);
router.get("/stream/:id", movieController.streamMovie);

module.exports = router;
