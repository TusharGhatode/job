const mongoose = require("mongoose");

const jobsApply = new mongoose.Schema(
  {
    image: {
      type: String,
    },

    name: {
      type: String,
      
    },

    email: {
      type: String,
      trim: true,
    },

    contact: {
      type: String,
      trim: true,
    },

    role: {
      type: String,
      trim: true,
    },

    resume: {
      type: String,
      trim: true,
    },

    recruiterId: {
      type: String,
      trim: true,
    },
    

  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("apply", jobsApply);
