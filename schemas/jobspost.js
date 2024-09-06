const mongoose = require("mongoose");

const jobsposting = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
    },

    logo: {
      type: String,
    },

    mobile: {
      type: String,
      trim: true,
    },

    Responsibilities: {
      type: String,
      trim: true,
    },

    email: {
      type: String,
      trim: true,
    },

    skills: {
      type: String,
      trim: true,
    },

    salary: {
      type: String,
      trim: true,
    },

    location: {
      type: String,
      trim: true,
    },

    experience: {
      type: String,
      trim: true,
    },

    description: {
      type: String,
    },

    vacancy: {
      type: String,
      trim: true,
    },

    jobtype: {
      type: String,
      trim: true,
    },

    userId: {
      type: String,
      require: true,
    },

    company: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("jobpost", jobsposting);
