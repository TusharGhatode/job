const express = require("express");
const router = new express.Router();
const userdb = require("../schemas/registration.js");
const User = require("../schemas/profile.js");
const admin = require("../firebase.js");
var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// router.post("/signup", async (req, res) => {
//   const { name, email, password, role } = req.body;
//   if (!name || !email || !password) {
//     res.status(422).json({ error: "fill all the details" });
//   }

//   try {
//     const preuser = await userdb.findOne({ email: email });

//     if (preuser ) {
//       res.status(422).json({ error: "This Email is Already Exist" });
//     } else {
//       const hashPass = await bcrypt.hash(password, 10);

//       const finalUser = new userdb({
//         name,
//         email,
//         role,
//         password: hashPass,
//       });

//       const storeData = await finalUser.save();

//       // console.log(storeData);
//       res.status(201).json({ status: 201, storeData });
//     }
//   } catch (error) {
//     res.status(422).json(error);
//     console.log("error");
//   }
// });

router.post("/signup", async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(422).json({ error: "Fill all the details" });
  }

  try {
    // Check if a user with the same email and role exists
    const existingUser = await userdb.findOne({ email, role });

    if (existingUser) {
      return res.status(401).json({
        message: `User with email ${email} and role ${role} already exists.`,
        status: 401,
      });
    }

    // Hash the password before saving the new user
    const hashPass = await bcrypt.hash(password, 10);
    const finalUser = new userdb({
      name,
      email,
      role,
      password: hashPass,
    });

    // Save the new user to the database
    const storeData = await finalUser.save();

    res.status(201).json({ status: 201, storeData });

  } catch (error) {
    if (error.code === 11000) {
      // This means a duplicate email and role combination was attempted
      return res.status(409).json({
        error: `A user with the email ${email} and role ${role} already exists.`,
        status: 409,
      });
    } else {
      console.error("Server error: ", error);
      res.status(500).json({ error: "Server error" });
    }
  }
});






router.post("/log", async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const userValid = await userdb.findOne({ email: email,role:role });

    if (!userValid) {
      return res
        .status(501)
        .json({ status: 501, message: "user not registered" });
    }

    const isMatch = await bcrypt.compare(password, userValid.password);

    if (!isMatch) {
      return res.status(422).json({ status: 422, error: "invalid details" });
    }

    if (userValid.role !== role) {
      return res
        .status(401)
        .json({ status: 401, error: "role is not correct" });
    }

    if (userValid.role === "employee") {
      return res.status(201).json({ status: 201, data: userValid });
    } else if (userValid.role === "recruiter") {
      return res.status(202).json({ status: 202, data: userValid });
    } else {
      return res.status(500).json({ status: 500, error: "Unknown role" });
    }
  } catch (error) {
    return res.status(404).json({ status: 404, error });
  }
});

// login with google

router.post("/api/protected", async (req, res) => {
  const idToken = req.headers.authorization;
  const decodedToken = await admin.auth().verifyIdToken(idToken);
  const { name, email } = decodedToken;

  let user = await userdb.findOne({ email });
  console.log(user);

  if (!user) {
    user = new userdb({ name, email });
    await user.save();
    res.status(200).json({ user, status: 200 });
  } else {
    res.status(200).json({ user, status: 200 });
  }
});

module.exports = router;
