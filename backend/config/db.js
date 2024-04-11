const mongoose = require('mongoose');

const dbConfig = {
  url: 'mongodb://localhost:27017/recipes',
};

const connectDB = async () => {
  try {
    await mongoose.connect(dbConfig.url);
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = { connectDB };