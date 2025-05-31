const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    taste:{
        type: String,
        enum: ['spicy', 'sweet', 'sour', 'bitter', 'salty'],
    },
    is_drink:{
        type: Boolean,
        default: false, // Default to false if not specified
    },
    category: {
        type: String,
        enum: ['starter', 'main course', 'dessert', 'beverage'],
        required: true,
    },
    ingredients: {
        type: [String], // Array of strings to hold ingredients
        default: [], // Default to an empty array if not specified
    },
    num_sales : {
        type: Number,
        default: 0, // Default to 0 if not specified
        // This field can be used to track the number of times the menu item has been sold
    },
    });

    const menuItem = mongoose.model('MenuItem', menuItemSchema); // Create a model named "MenuItem" using the menuSchema.

    module.exports = menuItem; // Export the MenuItem model so it can be used in other parts of the application.