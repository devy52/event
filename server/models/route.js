// routes.js
const express = require('express');
const router = express.Router();
const User = require('./user');
const bcrypt = require('bcrypt');
const { comparePasswords, generateToken } = require('./authMW');
const jwt = require('jsonwebtoken');
const Event = require('./events');


// User registration
router.post('/register', async (req, res) => {
    try {
      const { username, password, userType } = req.body;
  
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ error: 'Username already exists' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log(req.body);
      const user = new User({
        username,
        password: hashedPassword,
        userType, // Store userType in the user document
      });
  
      await user.save();
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while registering the user' });
    }
  });

  
  // Regular user login
router.post('/regular/login', async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Find the regular user by username in the database
      const user = await User.findOne({ username, userType: 'regular' });
  
      if (!user) {
        return res.status(404).json({ error: 'Regular user not found' });
      }
  
      // Compare the provided password with the hashed password from the database
      const validPassword = await bcrypt.compare(password, user.password);
  
      if (!validPassword) {
        return res.status(401).json({ error: 'Invalid password' });
      }
  
      // Generate a token for the authenticated regular user
      const token = jwt.sign({ userId: user._id, userType: 'regular' }, 'your-secret-key');
  
      res.status(200).json({ token, userType: 'regular' }); // Return the token and userType
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while logging in' });
    }
  });
  
  // Admin login
  router.post('/admin/login', async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Find the admin user by username in the database
      const user = await User.findOne({ username, userType: 'admin' });
  
      if (!user) {
        return res.status(404).json({ error: 'Admin user not found' });
      }
  
      // Compare the provided password with the hashed password from the database
      console.log(bcrypt.hash(password,10));
      const validPassword = await bcrypt.compare(password, user.password);
  
      if (!validPassword) {
        return res.status(401).json({ error: 'Invalid password' });
      }
  
      // Generate a token for the authenticated admin user
      const token = jwt.sign({ userId: user._id, userType: 'admin' }, 'your-secret-key');
  
      res.status(200).json({ token, userType: 'admin' }); // Return the token and userType
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while logging in' });
    }
  });

// Middleware to authenticate the user
const authenticateUser = (req, res, next) => {
    console.log("body",req.body);
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // Extract the token from the "Bearer" header format
    const authToken = token.split(' ')[1];
    
    // Verify the token and extract user information
    const decoded = jwt.verify(authToken, 'your-secret-key');
    req.user = decoded; // Store user information in the request object
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
};

  // Create a route to add a new event (POST request)
router.post('/events', authenticateUser, async (req, res) => {
    try {
      const { eventName, eventDate, eventDescription } = req.body;
  
      // Create a new event document and save it to the database
      const event = new Event({
        eventName,
        eventDate,
        eventDescription,
      });
  
      await event.save();
      res.status(201).json(event);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while adding the event' });
    }
  });  
  
  // Create a route to get all events (GET request)
  router.get('/events', authenticateUser, async (req, res) => {
    try {
      // Retrieve all events from the database
      const name=req.eventName;
      const events = await Event.find({eventName: name});
      console.log(events);
      res.status(200).json(events);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while retrieving events' });
    }
  });
  
  // Logout route
router.post('/logout', authenticateUser, (req, res) => {
    // Clear the user's token on the server-side
    // This can include any server-side cleanup or session management
  
    try {
      // Here, you might clear any server-side session data, if applicable.
      // For example, if you're using sessions, you can destroy the session:
      req.session.destroy((err) => {
        if (err) {
          console.error('Error destroying session:', err);
          return res.status(500).json({ error: 'An error occurred during logout' });
        }
  
        // Session destroyed successfully, send a response indicating success
        return res.status(200).json({ message: 'Logout successful' });
      });
    } catch (error) {
      console.error('An error occurred during logout:', error);
      res.status(500).json({ error: 'An error occurred during logout' });
    }
  });
  

module.exports = router;
