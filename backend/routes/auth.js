const express = require("express");
const router = express.Router();
const User = require("../model/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); 
const fetchuser = require('../middleware/fetchuser')
require('dotenv').config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

// ROUTE:1 : Create
// Create a  User using: POST "api/auth/createuser" .No login required
router.post( "/createuser",  [
    body("name", "Enter valid Name").isLength({ min: 3 }),
    body("email", "Enter valid Email").isEmail(),
    body("password", "Password length atleast 5").isLength({ min: 5 }),
  ],
  async (req, res) => {

    let success = false;
    // If there are errors, return Bad requesrt and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    const { email } = req.body;
    try {
      //Generate saltlet user = await User.findOne({ email });
      let exitingUser = await User.findOne({ email });
      console.log('existing user');
      console.log(exitingUser);
      if (exitingUser) {
        return res.status(400).json({success, error: "Please try to login with new email",
          });
      }

      const salt = await bcrypt.genSalt(10);
      //Add hase to password.
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      // Create user
      const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      });
      // Generate JWT token
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET_KEY);
      console.log("authtoken: " + authtoken);
      success = true
      res.json({success ,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        authtoken,
      });
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server Error" });
    }
  }
);


// ROUTE: 2 : Login 
// Authenticate a User using: POST "api/auth/login" .No login required
router.post( "/login", [
    body("email", "Account on this email is exist.").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    // If there are errors, return Bad requesrt and errors
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {

        return res.status(400).json({success, error: "Please try to login with correct email credentials",
          });
      }

      console.log("User object:", user);
      const passwordCompare = await bcrypt.compare(password, user.password);
      console.log("Password Compare Result:", passwordCompare);

      if (!passwordCompare) {
        // password does't match
        return res.status(400).json({ success, error: "Please try to login with correct password credentials", });
      } else {
        // password match 
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET_KEY);
      success = true;
      res.json({success, 
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        authtoken,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server Error" });
    }
  }
);




// ROUTE:3 : Getuser
// Get loggedin user Details using : POST "/api/auth/getuser" . Login Required
router.post('/getuser' ,fetchuser , async(req ,res)=> {
  try {
    const userId = req.user.id
    const user = await User.findById(userId).select("-password")
    res.send(user)

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server Error" });
  }
})
  

module.exports = router;