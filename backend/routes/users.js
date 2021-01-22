// Bring in Express
const express = require("express");

// Make the middleware for express
const router = express.Router();

// Bring in the right database model structure
const db = require("../models");
const keys = require("../config/keys");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtDecode = require("jwt-decode");
const Validator = require("validator");

// Load input validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");
const validateInfoChange = require("../validation/blacklist");

// This function will decode the token that the FE will send
function deCoding(token) {
  const id = jwtDecode(token);
  return id.id;
}

/*
==========================================================================================
Find All the Users
==========================================================================================
*/
router.get("/", (req, res) => {
  db.Users.findAll().then((newUser) => {
    res.json(newUser);
  });
});

/*
==========================================================================================
Register a User
==========================================================================================
*/
router.post("/register", async (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  console.log(
    `\n\n${req.body.username}\n${req.body.email}\n${req.body.password}\n${req.body.confirmPwd}\n\n`
  );

  const dataArr = [];
  /*
Using the add method from earlier only works if the relationship sourceTable is a many-to-many or a one-to-many, otherwise it doesnt work and we have to insert the id into the table directly 
  */

  // However, the first thing we need to do is check to see if the email is already in the database
  await db.Emails.findOne({ where: { email: req.body.email } }).then(async (data) => {
    if (data !== null) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      // Secondly create the Email
      await db.Emails.create({
        email: req.body.email,
      }).then((data) => {
        dataArr.push(data);
      });

      // Hash password before saving in database
      bcrypt.genSalt(10, async (err, salt) => {
        bcrypt.hash(req.body.password, salt, async (err, hash) => {
          if (err) throw err;
          req.body.password = hash;

          // Then create the User and the their Dup
          await db.Users.create({
            username: req.body.username,
            pw: hash,
            EmailId: dataArr[0].id,
          }).then((data) => {
            dataArr.push(data);
          });

          await db.UsersDup.create({
            username: req.body.username,
            pw: hash,
            EmailId: dataArr[0].id,
          }).then((data) => {
            dataArr.push(data);
          });
        });
      });

      res.json(dataArr);
    }
  });
});

/*
==========================================================================================
Login in a User
==========================================================================================
*/
router.post("/login", async (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const dataArr = [];

  // Expected Body = {username: "", password: ""}

  // However, the first thing we need to do is check to see if the email is already in the database
  await db.Emails.findOne({ where: { email: req.body.email } }).then(async (emailData) => {
    if (!emailData) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    } else {
      dataArr.push(emailData);
    }

    await db.Users.findOne({ where: { EmailId: dataArr[0].id } }).then((userData) => {
      bcrypt.compare(req.body.password, userData.pw).then((isMatch) => {
        if (isMatch) {
          // User matched
          // Create JWT Payload
          const payload = {
            id: userData.id,
            name: userData.username,
            email: dataArr[0].email,
          };

          // Sign token
          jwt.sign(
            payload,
            keys.secretOrKey,
            {
              expiresIn: 172800, // 2 days in seconds
            },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token,
              });
            }
          );
        } else {
          return res.status(400).json({ passwordincorrect: "Password incorrect" });
        }
      });
    });
  });
});

/*
==========================================================================================
Mark User that is Online
==========================================================================================
*/
router.put("/userOnline", async (req, res) => {
  // Here I'm going to use the JWT token that the registering process has in order to locate the user and then change the value of isOnline to true
});

/*
==========================================================================================
User Makes a Post
==========================================================================================
*/
router.post("/post", async (req, res) => {
  // I want to put the user being passed in here through the body
  console.log(`\n\n${req.body.jwt.name}\n${req.body.jwt.id}\n${req.body.jwt.email}\n\n`);
  console.log(`\n\n${req.body.content}\n\n`);

  const dataArr = [];

  // Since we have the id of the direct user in the JwtToken, we just need to create the post and pass the id for both columns of the UserId and the DupId

  await db.Posts.create({
    content: req.body.content,
    UserId: req.body.jwt.id,
    UsersDupId: req.body.jwt.id,
  }).then((data) => {
    dataArr.push(data);
  });

  res.json(dataArr);
});

/*
==========================================================================================
See the Post user just made
==========================================================================================
*/
router.post("/genUserPost", async (req, res) => {
  const dataArr = [];

  // Since we have the id of the direct user in the JwtToken, we just need to create the post and pass the id for both columns of the UserId and the DupId

  await db.Posts.findAll({ where: { UserId: req.body.jwt.id } }).then((data) => {
    dataArr.push(data);
  });

  res.json(dataArr);
});

module.exports = router;
