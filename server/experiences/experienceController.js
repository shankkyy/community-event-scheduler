const Experience = require('./experienceModel');
const path = require('path');

// Create a new experience
exports.addExperience = async (req, res) => {
    try {
        const { description } = req.body;
        const images = req.files.map(file => file.path);

        const newExperience = new Experience({
            description,
            images
        });

        await newExperience.save();
        res.status(201).json(newExperience);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all experiences
exports.getExperiences = async (req, res) => {
    try {
        const experiences = await Experience.find();
        res.status(200).json(experiences);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
