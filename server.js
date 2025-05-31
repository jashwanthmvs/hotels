const express = require("express");
const app = express();
const db = require("./db");
require("dotenv").config(); // Load environment variables from .env file

const MenuItem = require("./models/menu");

app.use(express.json()); // To parse JSON data in request bodies (e.g., from POST requests)
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded data (e.g., form submissions)

const PORT = process.env.PORT || 3000; // Use the PORT from environment variables or default to 3000

app.get("/", (req, res) => {
  res.send("Welcome to my hotel ");
});

const menuRoutes = require("./routes/menuRoutes"); // Import the menu routes from menuRoutes.js
app.use("/menu", menuRoutes);

const personRoutes = require("./routes/personRoutes"); // Import the person routes from personRoutes.js
app.use("/person", personRoutes); // Use the person routes defined in personRoutes.js


app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});
