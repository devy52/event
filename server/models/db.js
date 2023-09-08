// db.js
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://dev52:<password>@cluster0.msyyjkw.mongodb.net/gdsc', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('MongoDB connection error', err);
  });

module.exports = mongoose;
