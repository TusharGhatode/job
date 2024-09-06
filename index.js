const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const registration = require('./routes/registration')
const profile = require('./routes/profile')
const jobsPost = require('./routes/jobspost')
const email = require('./routes/email')
const apply = require('./routes/apply')
const filter = require('./routes/filter')





require('dotenv').config(); 
const PORT = process.env.PORT || 5000;
const app = express();
require('./config/db')


app.use(cors({
    origin: 'https://listing-job.netlify.app',
    methods: 'GET,POST,DELETE',
    credentials: true,
    
}))


app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
app.use(registration)
app.use(profile)
app.use(jobsPost)
app.use(email)
app.use(apply)
app.use(filter)
















app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
