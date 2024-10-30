// Import dependencies
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Initialize environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // Parse JSON data in requests
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data

// Import routes
const movieRoutes = require("./routes/movieRoutes");
const authRoutes = require("./routes/authRoutes");

// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Movie Streaming API",
      version: "1.0.0",
      description: "API for movie streaming and downloading",
      contact: {
        name: "Developer Name",
        email: "developer@example.com",
      },
    },
    servers: [
      {
        url: "http://localhost:" + PORT,
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Use routes
app.use("/api/movies", movieRoutes);
app.use("/api/auth", authRoutes); // Assuming there's a user authentication module

// Static files for uploads (if needed for local testing)
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Default Route
app.get("/", (req, res) => {
  res.send("Welcome to the Movie Streaming App API!");
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Set Port and Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});
