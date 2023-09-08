const mongoose = require('./db');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  userType: String, // Store userType in the user document
});

const User = mongoose.model('User', userSchema);

module.exports = User;
