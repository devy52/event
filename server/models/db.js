// db.js
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://<username>:<password>@<clusterNo.>.msyyjkw.mongodb.net/gdsc', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('MongoDB connection error', err);
  });

module.exports = mongoose;
