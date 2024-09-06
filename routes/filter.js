const express = require("express");
const router = new express.Router();
const jobspost = require("../schemas/jobspost");

router.post("/findSearch", async (req, res) => {
  const { search } = req.body;

  try {
    // Construct the query to search for jobs by title
    const query = {};
    if (search) {
      query.title = { $regex: search, $options: "i" }; // Case-insensitive search
    }

    // Fetch jobs from the database based on the query
    const jobs = await jobspost.find(query);

    // Return the fetched jobs
    res.status(200).json({
      message: "Data fetched successfully",
      data: jobs,
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/findLocation", async (req, res) => {
    const { location ,experience,jobtype} = req.body;
    
  
    try {
      let query = {};
  
      // Handle location filter if provided
      if (Array.isArray(location) && location.length > 0) {
        if (location.includes('anywhere')) {
          // If 'anywhere' is selected, don't filter by location
          query.location = { $exists: true }; // Fetch all jobs
        } else {
          query.location = { $in: location }; // Filter by any of the selected locations
        }
      }





      if (Array.isArray(experience) && experience.length > 0) {
        // if (experience.includes('anywhere')) {
        //   // If 'anywhere' is selected, don't filter by location
        //   query.location = { $exists: true }; // Fetch all jobs
        // } else {
          query.experience = { $in: experience }; // Filter by any of the selected locations
        // }
      }




      if (Array.isArray(jobtype) && jobtype.length > 0) {
        // if (experience.includes('anywhere')) {
        //   // If 'anywhere' is selected, don't filter by location
        //   query.location = { $exists: true }; // Fetch all jobs
        // } else {
          query.jobtype = { $in: jobtype }; // Filter by any of the selected locations
        // }
      }
  
      // Fetch jobs from the database based on the query
      const jobs = await jobspost.find(query);
  
      res.status(200).json({
        message: "Data fetched successfully",
        data: jobs,
        status: 200,
      });
    } catch (error) {
      console.error("Error fetching jobs:", error);
      res.status(500).json({ error: "Internal server error" });
    }

  
});

module.exports = router;
