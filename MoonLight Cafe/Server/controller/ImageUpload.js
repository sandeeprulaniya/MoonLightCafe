const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: "",
  api_key: "",
  api_secret: "",
});

const imageUploadController = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.files.image?.path);
    res.json({
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (error) {
    throw error;
  }
};

module.exports = { imageUploadController };
