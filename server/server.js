const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session'); // Import express-session
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Configure the session middleware
app.use(
  session({
    secret: 'your-secret-key', // Replace with a secret key for session encryption
    resave: false,
    saveUninitialized: false,
  })
);

// Import routes
const authRoutes = require('./models/route');

// Use routes
app.use('/api', authRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
