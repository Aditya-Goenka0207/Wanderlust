const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {

        // folder where images will be stored
        folder: "wanderlust_DEV",

        // image format
        format: async (req, file) => "jpg",

        // allowed formats
        allowed_formats: ["png", "jpg", "jpeg"],

        // unique file name
        public_id: (req, file) => {
            return "listing-" + Date.now();
        },

        // automatic image optimization
        transformation: [{ width: 1200, height: 800, crop: "limit" }]
    },
});

module.exports = {
    cloudinary,
    storage,
};