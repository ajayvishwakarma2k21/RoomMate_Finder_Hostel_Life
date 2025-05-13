// Import required modules
const express = require('express') // Express framework for building web applications
const mongoose = require('mongoose') // Mongoose for MongoDB object modeling
const cors = require('cors') // CORS middleware for enabling Cross-Origin Resource Sharing
const dotenv = require('dotenv') // dotenv for loading environment variables from a .env file
const userRoutes = require('./routes/userRoutes') // Import user routes

// Load environment variables from .env file
dotenv.config();

// Create an Express application
const app = express();

// Middleware to parse JSON bodies in requests
app.use(express.json());

// Middleware to enable CORS
app.use(cors());

// Connect to MongoDB using the connection string from the .env file
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser : true, // Use the new URL parser
    useUnifiedTopology: true, // Use the new Server Discover and Monitoring engine
}).then(()=> console.log('MongoDB connected')) // Log success message if connected
  .catch(err => console.log(err)); // Log error message if connection fails

// Use the user routes for any requests to /api/users
app.use('/api/users', userRoutes);

// Define the port number from environment variables or default to 5000
const PORT = process.env.PORT || 5000;

// Start the server and listen on the defined port
app.listen(PORT, () => console.log(`server running on port ${PORT}`));