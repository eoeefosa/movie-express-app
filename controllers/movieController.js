const Movie = require("../models/Movie");
const cloudinary = require("../config/cloudinary");

// Upload movie
exports.uploadMovie = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "video",
    });

    const newMovie = new Movie({
      title: req.body.title,
      description: req.body.description,
      genre: req.body.genre.split(","),
      releaseDate: req.body.releaseDate,
      cloudinary_id: result.public_id,
      url: result.secure_url,
    });

    await newMovie.save();
    res.status(201).json({ message: "Movie uploaded successfully", newMovie });
  } catch (error) {
    res.status(500).json({ error: "Failed to upload movie" });
  }
};

// Stream movie
exports.streamMovie = async (req, res) => {
  const { id } = req.params;
  const movie = await Movie.findById(id);
  if (movie) res.redirect(movie.url);
  else res.status(404).json({ error: "Movie not found" });
};

exports.downloadMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findById(id);

    if (!movie) return res.status(404).json({ error: "Movie not found" });

    res.redirect(movie.url);
  } catch (error) {
    res.status(500).json({ error: "Failed to download movie" });
  }
};

exports.viewMovies = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const movies = await Movie.find()
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve movies" });
  }
};

exports.searchMovies = async (req, res) => {
  try {
    const { query } = req.query;
    const movies = await Movie.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { genre: { $regex: query, $options: "i" } },
      ],
    });

    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ error: "Failed to search movies" });
  }
};
