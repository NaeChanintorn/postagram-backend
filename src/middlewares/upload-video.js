const multer = require("multer");

const videoStorage = multer.diskStorage({
  destination: "public/videos", // Destination to store video
  filename: (req, file, cb) => {
    // console.log(file);
    const filename =
      "" +
      Date.now() +
      Math.round(Math.random() * 1000000) +
      "." +
      file.mimetype.split("/")[1];
    console.log(filename);
    cb(null, filename);
  },
});

exports.videoUpload = multer({
  storage: videoStorage,
  limits: {
    fileSize: 10000000, // 10000000 Bytes = 10 MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(mp4|MPEG-4)$/)) {
      // upload only mp4 and mkv format
      return cb(new Error("Please upload a Video"));
    }
    cb(undefined, true);
  },
});
