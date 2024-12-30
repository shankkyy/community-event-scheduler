const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
        location: { type: String, required: true },
    organizer: { type: String, required: true },
    attendees: [{ type: String }]
});

module.exports = mongoose.model('Event', EventSchema);
