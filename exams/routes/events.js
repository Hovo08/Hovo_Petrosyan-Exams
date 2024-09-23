const express = require("express");
const router = express.Router();
const { createEvent, getEvents } = require("../controllers/eventsControllers");
const multer = require("multer");
const { verifyToken } = require("../middlewares/authMiddleware");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/events", verifyToken, upload.single("image"), createEvent); 
router.get("/events", getEvents); 

module.exports = router;
