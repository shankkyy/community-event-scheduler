const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    images: [{
        type: String
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Experience', experienceSchema);
