import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    genre: [String],
    releaseDate: { type: Date },
    cloudinary_id: { type: String },
    url: { type: String, required: true },
  },
  { timestamps: true } // Automatically manages createdAt and updatedAt fields
);

export default mongoose.model("Movie", movieSchema);
