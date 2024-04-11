const mongoose = require('mongoose');

const dbConfig = {
  url: 'mongodb+srv://zachary:dBPE9gI7BuYM0b0p@cluster0.wjhf5cx.mongodb.net/?retryWrites=true&w=majority',
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