const { Router } = require("express");

const express = require("express");
const multer = require("multer");

const router = Router();

function filename(request, file, callback) {
  callback(null, file.originalname);
}

const storage = multer.diskStorage({
  destination: "api/uploads/",
  filename: filename,
});

function fileFilter(request, file, callback) {
  if (file.mimetype !== "image/png") {
    request.fileValidationError = "Wrong file type";
    return callback(null, false, new Error("Wrong file type"));
  } else {
    callback(null, true);
  }
}

const upload = multer({
  fileFilter: fileFilter,
  storage: storage,
});

router.post("/upload", upload.single("photo"), (request, response) => {
  if (req.fileValidationError) {
    return res.status(400).json({ error: req.fileValidationError });
  } else {
    return response.status(201).json({ success: true });
  }
});

module.exports = router;
