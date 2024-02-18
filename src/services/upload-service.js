const cloudinary = require("../get-photo/cloudinary");

exports.uploadImage = async (path) => {
  console.log(path);
  const { secure_url } = await cloudinary.uploader.upload(path, {
    use_filename: true,
  });
  console.log(secure_url);
  return secure_url;
};

exports.uploadVideo = async (path) => {
  console.log(path);
  const { secure_url } = await cloudinary.uploader.upload(path, {
    resource_type: "video",
  });
  console.log(secure_url);
  return secure_url;
};
