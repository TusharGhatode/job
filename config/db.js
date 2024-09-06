const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables from .env file

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected!"))
  .catch((err) => console.log("error hai "));


