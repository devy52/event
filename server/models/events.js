// event.js
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  eventName: String,
  eventDate: Date,
  eventDescription:String,
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
