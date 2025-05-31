const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
    name :{
        type : String,
        required: true,
    },
    age : {
        type : Number,
    },
    work : {
        type : String,
        enum : ['chef','waiter','manager'],
        required: true
    },
    mobile: {
        type: String,
        required: true,
        unique: true
    },
    email :{
        type : String,
        required: true,
        unique: true
    },
    address: {
        type: String,
    },
    salary: {
        type: Number,
        required: true
    },
});

const Person = mongoose.model("Person", personSchema); // Create a model named "Person" using the personSchema. 
// The model will be used to interact with the "people" collection in the MongoDB database.


module.exports = Person;