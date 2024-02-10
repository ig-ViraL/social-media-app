const multer = require("multer");
const mongoose = require("mongoose");
const { GridFsStorage } = require("multer-gridfs-storage");
const { MongoClient, GridFSBucket } = require("mongodb");
const dbConnection = require("../config/db.config");
const config = require("../config/config");
const rateLimit = require("express-rate-limit");

// Upload file
const storage = new GridFsStorage({
  db: dbConnection,
  file: (req, file) => {
    return {
      bucketName: "assets",
      filename: file.originalname,
    };
  },
});
const upload = multer({ storage });

// retrieve file
// Create a new instance of GridFSBucket using the dbConnection
async function getFile(fileId) {
  const gfs = new mongoose.mongo.GridFSBucket(dbConnection.db, {
    bucketName: "assets",
  });
  gfs.find({ _id: fileId }, (err, file) => {
    // Check for errors
    if (!file || file.length === 0) {
      console.log("file not found.");
      return res.status(404).json({
        err: "No file exists",
      });
    }
    const readstream = gfs.openDownloadStream(file._id);
    console.log("gfs", readstream);
    return file;
  });
}

module.exports = {
  upload,
};
