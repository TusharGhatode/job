const express = require("express");
const router = new express.Router();
const multer = require("multer");
const User = require("../schemas/profile");
const regis = require("../schemas/registration");
const jobpost = require("../schemas/jobspost");
const apply = require("../schemas/apply");

const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../cloudinaryConfig");

// Configure Cloudinary Storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "Job-Listing/folders",
    allowedFormats: ["jpg", "png", "pdf"],
  },
});
const upload = multer({ storage });

router.post(
  "/upload",
  upload.fields([
    { name: "profileFile", maxCount: 1 },
    { name: "resumeFile", maxCount: 1 },
  ]),
  async (req, res) => {
    try {

      console.log(req.body)
      const {
        name,
        mobile,
        email,
        skills,
        intro,
        location,
        headline,
        experience,
        userId,
      } = req.body;

      const profileImageUrl = req.files.profileFile
        ? req.files.profileFile[0].path
        : null;
      const resumePdfUrl = req.files.resumeFile
        ? req.files.resumeFile[0].path
        : null;

      let user = await User.findOne({ userId });
      

      if (user) {
        // Update existing user
        user.name = name || user.name;
        user.mobile = mobile || user.mobile;
        user.email = email || user.email;
        user.skills = skills || user.skills;
        user.intro = intro || user.intro;
        user.location = location || user.location;
        user.headline = headline || user.headline;
        user.experience = experience || user.experience;
        user.profile = profileImageUrl || user.profile;
        user.resume = resumePdfUrl || user.resume;

        await user.save();
        res.status(201).json({
          message: "User data updated successfully",
          data: user,
          status: 201,
        });
      } else {
        // Create a new user
        const newUser = new User({
          name,
          mobile,
          email,
          skills,
          intro,
          experience,
          location,
          headline,
          profile: profileImageUrl,
          resume: resumePdfUrl,
          userId,
        });

        await newUser.save();
        res.status(201).json({
          message: "User created successfully",
          data: newUser,
          status: 201,
        });
      }
    } catch (error) {
      console.error("Error saving data:", error);
      res.status(500).json({ message: "Error uploading data", error });
    }
  }
);

router.post("/regis", async (req, res) => {
  const { userId } = req.body;
  const userData = await regis.findOne({ _id: userId });
  res.status(201).json({
    message: "Data fetch successfully",
    data: userData,
    status: 201,
  });
});

router.post("/getData", async (req, res) => {
  const { userId } = req.body;

  try {
    const userData = await User.findOne({ userId });
    console.log(userData)
  
      res.status(201).json({
        message: "Data fetched successfully",
        data: userData,
        status: 201,
      });
    
  } catch (error) {
    res.status(500).json({
      message: "Error fetching data",
      error: error.message,
      status: 500,
    });
  }
});

router.post("/getPostedData", async (req, res) => {
  const { userId } = req.body;

  try {
    // Assuming userId corresponds to the _id field in the database
    const userData = await jobpost.find({ userId });
    console.log(userData);

    if (userData) {
      res.status(201).json({
        message: "Data fetched successfully",
        data: userData,
        status: 201,
      });
    } else {
      res.status(404).json({
        message: "User not found",
        status: 404,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error fetching data",
      error: error.message,
      status: 500,
    });
  }
});

router.get("/getPostedDataEmp", async (req, res) => {
  try {
    // Assuming userId corresponds to the _id field in the database
    const userData = await jobpost.find({});

    if (userData) {
      res.status(201).json({
        message: "Data fetched successfully",
        data: userData,
        status: 201,
      });
    } else {
      res.status(404).json({
        message: "User not found",
        status: 404,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error fetching data",
      error: error.message,
      status: 500,
    });
  }
});

router.post("/jobDetailPage", async (req, res) => {
  const { userId } = req.body;

  try {
    // Assuming userId corresponds to the _id field in the database
    const userData = await jobpost.findOne({ _id: userId });

    if (userData) {
      res.status(201).json({
        message: "Data fetched successfully",
        data: userData,
        status: 201,
      });
    } else {
      res.status(404).json({
        message: "User not found",
        status: 404,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error fetching data",
      error: error.message,
      status: 500,
    });
  }
});

router.post("/getRequest", async (req, res) => {
  const {recId} = req.body

  try {
    
    const userData = await apply.find({recruiterId:recId});
    
    res.status(201).json({
      message: "Data fetched successfully",
      data: userData,
      status: 201,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching data",
      error: error.message,
      status: 500,
    });
  }
});






module.exports = router;
