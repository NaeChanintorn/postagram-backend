const cloudinary = require("../get-photo/cloudinary");

exports.uploadImage = async (path) => {
  const { secure_url } = await cloudinary.uploader.upload(path, {
    use_filename: true,
  });
  return secure_url;
};
