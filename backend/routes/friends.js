// Bring in Express
const express = require("express");

// Make the middleware for express
const router = express.Router();

// Bring in the right database model structure
const db = require("../models");

// This File will be mainly for the Friendship and FriendReq tables

// Get all the data
router.get("/", async (req, res) => {
  const dataArr = [];

  await db.UsersFriendships.findAll({}).then((data) => {
    dataArr.push(data);
  });

  await db.UsersFriendReq.findAll({}).then((data) => {
    dataArr.push(data);
  });

  res.json(dataArr);
});


// Friend Request gets sent
router.post("/superManyToMany", async (req, res) => {
// Since the friend Request Table is seperate, I'm going to need to create one eventually-manually
// I could do it all in one go, or take it procedurally, ---> I TOOK THE PRODECURAL ROUTE

/* BODY 
{
    sender: "email"
    receiver: "email"
}
*/

// IMPORTANT!!!!! send the email info of Friend Req SENDER that will eventually be stored on the Front End as a state because I will then find the User and its Dup by the email
const senderEmailFound = db.Emails.findOne({where : {email: req.body.sender}}).then(async (data)=> {
data
})

// Also find the Receiever of the Friend Request and their Dup
const receiverEmailFound = db.Emails.findOne({where : {email: req.body.receiver}}).then(async (data)=> {
    data
    })

// so create the FR with no data injection
await db.UsersFriendReq.create({});

// find the sender (From the Original Users Table)
// const reqSender = await db.Users.findOne({ where: { id: req.body. } });


    // Here I need to find the User and their Duplicate
    const reqSender = await db.UsersDup.findOne({ where: { id: 5 } });

    // Then I need to get the friend request
    const FriendRequest = await db.UsersFriendReq.findOne({ where: { id: 1 } });

    // Then add the request to each of the users
    findUser.addUsersFriendReq(FriendRequest);
    findUserDup.addUsersFriendReq(FriendRequest);

  
    res.json(FriendRequest);
  });

module.exports = router;
