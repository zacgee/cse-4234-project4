const express = require('express');
const mongoose = require('mongoose');
const recipeRoutes = require('./routes/recipeRoutes');
const { connectDB } = require('./config/db');
const { processJsonData } = require('./utils/jsonProcessor');

const app = express();

// Connect to the database
connectDB();

// Process the JSON file and save the data to the database
processJsonData();

// Use the recipe routes
app.use('/api/recipes', recipeRoutes);

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});