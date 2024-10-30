const cloudinary = require("../config/cloudinary");

exports.uploadFile = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "video", // Specify "video" for movie files
    });
    return result;
  } catch (error) {
    throw new Error("Cloudinary upload failed");
  }
};

exports.deleteFile = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId, { resource_type: "video" });
  } catch (error) {
    throw new Error("Cloudinary delete failed");
  }
};
