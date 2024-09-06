const express = require("express");
const router = new express.Router();
const nodemailer = require("nodemailer");
const Mailgen = require('mailgen');

// Create a Mailgen instance with your company details
const mailGenerator = new Mailgen({
    theme: 'default',
    product: {
        name: 'JOB-LISTING',
        link: '#'
    }
});

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
    service: 'gmail', // Replace with your email service
    auth: {
        user: 'tusharghatode16@gmail.com', // Replace with your Gmail address
        pass:  'essh gcbf xbla rgxl' // Replace with your generated app password
    }
});

// Function to send email
const sendEmail = async (from, to, subject, emailContent) => {
    const email = {
        from,
        to,
        subject,
        html: emailContent
    };

    try {
        await transporter.sendMail(email);
        console.log('Email sent successfully!');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

// Function to generate email content using Mailgen
const generateEmailContent = (name, message) => {
    const email = {
        body: {
            name,
            intro: message,
            
        }
    };

    return mailGenerator.generate(email);
};

// Route to handle email sending
router.post("/email", async (req, res) => {
    const { email, name, message } = req.body; // Ensure all required fields are included

    try {
        const emailContent = generateEmailContent(name, message);
        await sendEmail('tusharghatode16@gmail.com', email, 'Subject of Your Email', emailContent);
        res
        .status(201)
        .json({ message: "Data sent successfully", status:201 });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Error sending email');
    }
});

module.exports = router;
