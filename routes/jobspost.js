const express = require("express");
const router = new express.Router();
const multer = require("multer");
const jobs = require("../schemas/jobspost");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../cloudinaryConfig")

// Configure Cloudinary Storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "Job-Listing/folders",
    allowedFormats: ["jpg", "png", "pdf"],
  },
});
const upload = multer({ storage });

// router.post(
//   "/jobsUpload",
//   upload.fields([
//     { name: "logo", maxCount: 1 },
//   ]),
//   async (req, res) => {
    
//     try {
//       const {
//         title,
//         logo ,
//         mobile,
//         Responsibilities,
//         email,
//         skills,
//         salary,
//         location,
//         description,
//         experience,
//         qualification,
//         jobtype,
//         userId,
//         company
//       } = req.body;

//       // Ensure files are present
//       const companyLogo = req.files.logo
//         ? req.files.logo[0].path
//         : null;

//       const newUser = new jobs({
//         title,
//         logo: companyLogo || null,
//         mobile,
//         Responsibilities,
//         email,
//         skills,
//         salary,
//         location,
//         description,
//         experience,
//         vacancy:qualification,
//         jobtype,
//         userId,
//         company
//       });

//       await newUser.save();

      
//       res
//       .status(201)
//       .json({ message: "Data uploaded successfully", backData: newUser,status:201 });
//   } catch (error) {
//     console.error("Error saving data:", error);
//     res.status(500).json({ message: "Error uploading data", error });
//     }
//   }
// );



router.post(
  "/jobsUpload",
  upload.fields([{ name: "logo", maxCount: 1 }]),
  async (req, res) => {
    try {
      const {
        title,
        logo,
        mobile,
        Responsibilities,
        email,
        skills,
        salary,
        location,
        description,
        experience,
        qualification,
        jobtype,
        userId,
        company
      } = req.body;

      // Ensure files are present
      const companyLogo = req.files.logo ? req.files.logo[0].path : null;

      // Convert relevant fields to lowercase
      const lowerCaseData = {
        title: title.toLowerCase(),
        mobile: mobile.toLowerCase(),
        Responsibilities: Responsibilities.toLowerCase(),
        email: email.toLowerCase(),
        skills: skills.toLowerCase(),
        salary: salary.toLowerCase(),
        location: location.toLowerCase(),
        description: description.toLowerCase(),
        experience: experience.toLowerCase(),
        qualification: qualification.toLowerCase(),
        jobtype: jobtype.toLowerCase(),
        company: company.toLowerCase()
      };

      // Create new job entry
      const newUser = new jobs({
        ...lowerCaseData,
        logo: companyLogo || null,
        userId
      });

      await newUser.save();

      res
        .status(201)
        .json({ message: "Data uploaded successfully", backData: newUser, status: 201 });
    } catch (error) {
      console.error("Error saving data:", error);
      res.status(500).json({ message: "Error uploading data", error });
    }
  }
);


module.exports = router;
