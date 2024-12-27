import express from "express";
import movieController from "../controllers/movieController.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.post("/upload", auth.verifyToken, movieController.uploadMovie);
router.get("/stream/:id", movieController.streamMovie);

export default router;
