const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movieController");
const auth = require("../middlewares/auth");
const upload = require("../middlewares/multer");
/**
 * @swagger
 * /api/movies/upload:
 *   post:
 *     summary: Upload a new movie
 *     tags: [Movies]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               genre:
 *                 type: string
 *                 description: "Comma-separated genres"
 *               releaseDate:
 *                 type: string
 *                 format: date
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Movie uploaded successfully
 *       500:
 *         description: Server error
 */
router.post(
  "/upload",
  auth.verifyToken,
  upload.single("file"),
  movieController.uploadMovie
);
router.get("/stream/:id", movieController.streamMovie);
/**
 * @swagger
 * /api/movies/search:
 *   get:
 *     summary: Search for movies by title or genre
 *     tags: [Movies]
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: Search term for title or genre
 *     responses:
 *       200:
 *         description: List of movies matching the search
 *       500:
 *         description: Server error
 */
router.get("/search", movieController.searchMovies);
/**
 * @swagger
 * /api/movies/view:
 *   get:
 *     summary: View all movies with pagination
 *     tags: [Movies]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of movies per page
 *     responses:
 *       200:
 *         description: List of movies
 *       500:
 *         description: Server error
 */
router.get("/view", movieController.viewMovies);

/**
 * @swagger
 * /api/movies/download/{id}:
 *   get:
 *     summary: Download a movie by ID
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Movie ID
 *     responses:
 *       302:
 *         description: Redirect to movie download link
 *       404:
 *         description: Movie not found
 *       500:
 *         description: Server error
 */
router.get("/download/:id", movieController.downloadMovie);

module.exports = router;
