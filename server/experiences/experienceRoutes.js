const express = require('express');
const router = express.Router();
const multer = require('multer');
const experiencesController = require('./experienceController');
const path =require('path')
// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Routes
router.post('/add', upload.array('images', 3), experiencesController.addExperience);
router.get('/', experiencesController.getExperiences);

module.exports = router;
