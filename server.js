const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = '1@1BharD'; // Change this to a more secure secret key

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Middleware to parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MongoDB connection URL
const MONGODB_URI = 'mongodb://localhost:27017/lfps-school';

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB successfully!');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
  });

// Define Mongoose schema for user
const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  userType: { type: String, enum: ['student', 'admin'] }
});

// Define Mongoose models for student and staff
const Student = mongoose.model('Student', userSchema);
const Staff = mongoose.model('Staff', userSchema);

// Define a function to hash the password
async function hashPassword(password) {
  const saltRounds = 10;

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw new Error('Error hashing password: ' + error.message);
  }
}

// Route handler for signup
app.post('/signup', async (req, res) => {
  const { email, password, userType } = req.body;

  try {
    // Check if the email is already registered
    const existingUser = await (userType === 'student' ? Student.findOne({ email }) : Staff.findOne({ email }));
    if (existingUser) {
      return res.status(400).send('Email already registered');
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create a new user document
    let newUser;
    if (userType === 'student') {
      // Create a new user document for student
      newUser = new Student({
        email,
        password: hashedPassword,
        userType: 'student'
      });
    } else if (userType === 'admin') {
      // Create a new user document for staff
      newUser = new Staff({
        email,
        password: hashedPassword,
        userType: 'admin'
      });
    } else {
      return res.status(400).send('Invalid user type');
    }

    // Save the user to the appropriate collection
    await newUser.save();

    res.send('Signup successful!');
  } catch (error) {
    console.error('Error during signup:', error.message);
    res.status(500).send('Error signing up. Please try again later.');
  }
});




// Route handler for login
app.post('/login', async (req, res) => {
  const { email, password, userType } = req.body;

  try {
    // Find user by email
    const user = await (userType === 'student' ? Student.findOne({ email }) : Staff.findOne({ email }));

    if (!user) {
      return res.status(401).send('Invalid email or password');
    }

    // Compare the provided password with the hashed password
    bcrypt.compare(password, user.password, (err, result) => {
      if (err || !result) {
        return res.status(401).send('Invalid email or password');
      }

      res.send('Login successful!');
    });
  } catch (error) {
    console.error('Error during login:', error.message);
    res.status(500).send('Error logging in. Please try again later.');
  }
});




// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
