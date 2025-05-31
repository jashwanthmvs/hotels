const express = require("express");
const router = express.Router();
const Person = require("../models/person"); // Import the Person model
const { run } = require("node:test");

router.post("/", async (req, res) => {
  try {
    const data = req.body; // Assuming req.body contains the person data

    // const newPerson = new Person(data);

    // newPerson.name =  data.name;
    // newPerson.age = data.age;
    // newPerson.work = data.work;
    // newPerson.mobile = data.mobile;
    // newPerson.email = data.email;
    // newPerson.address = data.address;
    // newPerson.salary = data.salary;

    // instead of doing all above things , we just simply pass the data in the newly created object .
    // The data from req.body is directly passed to the Person model constructor, which creates a new instance of the Person model with the provided data.

    const newPerson = new Person(data);

    const response = await newPerson.save(); // Save the new person to the database

    console.log("New person added:", response);

    res.status(201).json(response); // Respond with the created person data}
  } catch (err) {
    console.error("Error adding person:", err);
    res.status(500).json({ error: "Failed to add person" });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await Person.find(); // Fetch all persons from the database
    console.log("Data fetched");
    res.status(200).json(data); // Respond with the list of persons
  } catch (err) {
    console.error("Error fetching persons:", err);
    res.status(500).json({ error: "Failed to fetch persons" });
  }
});

router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType; // Extract the work type from the request parameters

    if (workType == "chef" || workType == "manager" || workType == "waiter") {
      const response = await Person.find({ work: workType }); // Find persons with the specified work type
      console.log(`Persons with work type ${workType} fetched`);
      res.status(200).json(response); // Respond with the list of persons with the specified work type
    } else {
      res.status(400).json({ error: "Invalid work type" }); // Respond with an error if the work type is invalid
    }
  } catch (err) {
    console.error("Error fetching persons by work type:", err);
    res.status(500).json({ error: "Failed to fetch persons by work type" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id; // Extract the person ID from the request parameters
    const updatedPersonData = req.body; // Get the updated person data from the request body

    const response = await Person.findByIdAndUpdate(
      personId,
      updatedPersonData,
      {
        new: true,
        runValidators: true, // Ensures that the update operation respects the validation rules defined in the Mongoose schema
      }
    );
    /* In the context of Mongoose, the `new: true` option is used to return 
        the modified document rather than the original one. return the modified document rather than the original one. 
    */

    if (!response) {
      return res.status(404).json({ error: "Person not found" }); // Respond with an error if the person is not found
    }

    console.log("Person updated:", response);
    res.status(200).json(response); // Respond with the updated person data
  } catch (error) {
    console.error("Error updating person:", error);
    res.status(500).json({ error: "Failed to update person" });
  }
});

router.delete("/:id",async (req,res)=>{
    try{
        const personId = req.params.id;
        const response = await Person.findByIdAndDelete(personId)

        if(!response){
            return res.status(404).json({error:"Person not found"}); // Respond with an error if the person is not found
        }
        
        console.log("Person deleted:", response);
        res.status(200).json({message:"Person deleted successfully"}); // Respond with a success message
    }
    catch(error){
        console.error("Error deleting person:", error);
        res.status(500).json({ error: "Failed to delete person" });
    }
})

module.exports = router;
