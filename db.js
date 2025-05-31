const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables from .env file

// const mongoURL = "mongodb://localhost:27017/hotelDB";
// const mongoURL = process.env.MONGODB_URL_LOCAL
const mongoDBURL = process.env.MONGODB_URL || process.env.MONGODB_URL_LOCAL;

mongoose.connect(mongoDBURL);

const db = mongoose.connection;

db.on("connected", () => {
  console.log("Connected to MongoDB");
});

db.on("error", (err) => {
  console.error("Error connecting to MongoDB:", err);
});

db.on("disconnected", () => {
  console.log("Disconnected from MongoDB");
});

module.exports = db;
