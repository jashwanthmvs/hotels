const express = require("express");
const router = express.Router();

const MenuItem = require("../models/menu") // Import the MenuItem model

router.post("/", async (req, res) => {
  try {
    const data = req.body; // Assuming req.body contains the menu item data
    const newMenuItem = new MenuItem(data); // Create a new instance of the MenuItem model with the provided data

    const response = await newMenuItem.save();

    console.log("New menu item added:", response);

    res.status(201).json(response); // Respond with the created menu item data
  } catch (error) {
    console.error("Error adding menu item:", error);
    res.status(500).json({ error: "Failed to add menu item" });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await MenuItem.find(); // Fetch all menu items from the database
    console.log("Menu items fetched");
    res.status(200).json(data); // Respond with the list of menu items
  } catch (err) {
    console.error("Error fetching menu items:", err);
    res.status(500).json({ error: "Failed to fetch menu items" });
  }
});


router.get("/:taste",async (req,res)=>{
    try{
        const taste = req.params.taste; // Extract the taste from the request parameters
        if(taste === "spicy" || taste === "sweet" || taste === "sour" || taste === "bitter" || taste === "salty"){
          const response = await MenuItem.find({ taste: taste }); // Find menu items with the specified taste
          console.log(`Menu items with taste ${taste} fetched`);
          res.status(200).json(response); // Respond with the list of menu items with the specified taste
        }
        else {
          res.status(400).json({ error: "Invalid taste type" }); // Respond with an error if the taste is invalid
        }
    }
    catch(error){
        console.error("Error fetching menu items by taste:", error);
        res.status(500).json({ error: "Failed to fetch menu items by taste" });
    }
})

module.exports = router; // Export the router to be used in the main application file