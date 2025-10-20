const express = require("express");
const router = express.Router();
const multer = require("multer");

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    // Check if file is an image
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

const {
  createResume,
  getResumes,
  getResumeById,
  updateResume,
  deleteResume,
  generateResumePDF,
  healthCheck,
  pdfHealthCheck,
} = require("../controllers/resumeController");

// Health check route
router.get("/health", healthCheck);

// PDF health check route
router.get("/pdf-health", pdfHealthCheck);

// ✅ FIXED: Changed from "profilePic" to "file" to match frontend
router.post("/", upload.single("file"), createResume);

// Get all resumes
router.get("/", getResumes);

// Get single resume by ID
router.get("/:id", getResumeById);

// ✅ FIXED: Changed from "profilePic" to "file" to match frontend
router.put("/:id", upload.single("file"), updateResume);

// Delete resume
router.delete("/:id", deleteResume);

// Generate PDF for resume
router.get("/:id/pdf", generateResumePDF);

// Error handling middleware for multer
router.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        message: 'File too large. Maximum size is 5MB.'
      });
    }
  }
  
  if (error) {
    return res.status(400).json({
      message: error.message
    });
  }
  
  next();
});

module.exports = router;