const express = require('express');
const mongoose = require('mongoose');
const recipeRoutes = require('./routes/recipeRoutes');
const { connectDB } = require('./config/db');
const { processJsonData } = require('./utils/jsonProcessor');
const path = require('path'); // Import path module

const app = express();

// Connect to the database
connectDB();

// Use JSON parser middleware
app.use(express.json());

// Use the recipe routes
app.use('/api/recipes', recipeRoutes);

// Serve static assets (React build files)
app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

// For any other route, serve the React frontend
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'client', 'build', 'index.html'));
});

// Define endpoint to trigger data population
app.post('/api/populateDB', (req, res) => {
  // Call the function to process JSON data and save to the database
  processJsonData();
  // Send a response back to the client
  res.json({ message: '782 recipe(s) successfully added to the database' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
