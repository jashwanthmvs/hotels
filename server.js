const express = require("express");
const app = express();
const db = require("./db");

const MenuItem = require("./models/menu");

app.use(express.json()); // To parse JSON data in request bodies (e.g., from POST requests)
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded data (e.g., form submissions)

app.get("/", (req, res) => {
  res.send("Welcome to my hotel ");
});

const menuRoutes = require("./routes/menuRoutes"); // Import the menu routes from menuRoutes.js
app.use("/menu", menuRoutes);

const personRoutes = require("./routes/personRoutes"); // Import the person routes from personRoutes.js
app.use("/person", personRoutes); // Use the person routes defined in personRoutes.js

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
