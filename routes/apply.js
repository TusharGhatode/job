const express = require("express");
const router = new express.Router();
const apply = require("../schemas/apply");
const prof = require("../schemas/profile");

router.post("/apply", async (req, res) => {
  const { contact, image, resume, empJobTitle, name, email, recId } = req.body;

  try {
    // Check if a user with the same email and empJobTitle already applied
    const existingApplication = await apply.findOne({ email, role: empJobTitle });

    if (existingApplication) {
      // If the application already exists, send a message
      return res.status(409).json({ message: "You have already applied for this job title.",status:409 });
    }

    // If no application exists, create a new one
    const finalUser = new apply({
      contact,
      image,
      resume,
      name,
      email,
      role: empJobTitle,  // Job title
      recruiterId: recId
    });

    const storeData = await finalUser.save();

    res.status(201).json({ status: 201, storeData });
  } catch (error) {
    res.status(422).json(error);
    console.log("error:", error);
  }
});
module.exports = router;
