import multer, { Multer } from "multer";
import path from "path";
import { RequestHandler } from "express";

const directoryPath = path.dirname(__filename);

const storage = multer.diskStorage({
  // destination(req, file, callback) {
  //   callback(null, path.join(directoryPath,'../../../frontend/voxvortex-Angular/src/assets/public/BlogImages'));
  // },
  filename(req, file, callback) {
    callback(null, Date.now() + '-' + file.originalname);
  },
});

const upload: RequestHandler = multer({
  storage: storage
}).single('image');

export default upload;

// const multer = require("multer");
// const path = require("path");

// const directoryPath = path.dirname(__filename);

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(directoryPath, "/../../client-coco/public/Images"));
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// const upload = multer({ storage: storage });

// module.exports = upload;