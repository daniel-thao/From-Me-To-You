// Bring in Express
const express = require("express");

// Make the middleware for express
const router = express.Router();

// Bring in the right database model structure
const db = require("../models");

// console.log(db.Users + "");
router.get("/", (req, res) => {
  db.Users.findAll().then((newUser) => {
    res.json(newUser);
  });
});

// ============================== Register a User ==============================

router.post("/register", async (req, res) => {
  const dataArr = [];
  /*
Using the add method from earlier only works if the relationship sourceTable is a many-to-many or a one-to-many, otherwise it doesnt work and we have to insert the id into the table directly 
  */

  // However, the first thing we need to do is check to see if the email is already in the database
  await db.Emails.findOne({ where: { email: req.body.email } }).then(async (data) => {
    if (data !== null) {
      return res.send("got to get a new Email Bruv");
    } else {
      // Secondly create the User and it's duplicate
      await db.Users.create({
        username: req.body.username,
        pw: req.body.pw,
      }).then((data) => {
        dataArr.push(data);
      });
    
      await db.UsersDup.create({
        username: req.body.username,
        pw: req.body.pw,
      }).then((data) => {
        dataArr.push(data);
      });
    
      // Then create the email with the id's of the user and its duplicate
      await db.Emails.create({
        email: req.body.email,
        UserId: dataArr[0].id,
        UsersDupId: dataArr[1].id,
      }).then((data) => {
        dataArr.push(data);
      });
    
      res.json(dataArr);

    }
  });

});

module.exports = router;
