// Bring in Express
const express = require("express");

// Make the middleware for express
const router = express.Router();

// Bring in the right database model structure
const db = require("../models");

const jwt = require("jsonwebtoken");
const jwtDecode = require("jwt-decode");


// This function will decode the token that the FE will send for the direct user, but not technically needed for the indirect user involved
function deCoding(token) {
  const id = jwtDecode(token);
  return id.id;
};

// This File will be mainly for the Friendship and FriendReq tables

/*
==========================================================================================
Get all the Data of Friendships and Friend Requests
==========================================================================================
*/
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

/*
==========================================================================================
Sending a friend Request to Someone else - when btn is clicked on FE
==========================================================================================
*/
router.post("/makeFriendReq", async (req, res) => {
  const dataArr = [];
  /* BODY 
  {
    sender: email int that was stored on the Front End
    receiver: email int that was stored on the Front End
  }
  */

  // IMPORTANT!!!!! send the email info of Friend Req SENDER that will eventually be stored on the Front End as a state because I will then find the User and its Dup by the email
  await db.Users.findOne({ where: { EmailId: req.body.sender } }).then(async (data) => {
    dataArr.push(data);
  });

  // Also find the Receiever of the Friend Request and their Dup
  await db.UsersDup.findOne({
    where: { EmailId: req.body.receiver },
  }).then(async (data) => {
    dataArr.push(data);
  });

  // Before I even create the FR, I need to see if it already exists in the FR table
  // So we are checking to see if the current sender already has a request in or if the receiver has actually sent a FR in the past to the current sender
  const senderCheck = await db.UsersFriendReq.findOne({
    where: { UserId: dataArr[0].id, UsersDupId: dataArr[1].id },
  });

  const receiverCheck = await db.UsersFriendReq.findOne({
    where: { UserId: dataArr[1].id, UsersDupId: dataArr[0].id },
  });

  // If there is already a FR between the two users, then stop the process, else go through with making the connection
  if (senderCheck !== null || receiverCheck !== null) {
    return res.send("already have a friend Request");
  } else {
    // so create the FR with no data injection
    await db.UsersFriendReq.create({}).then((data) => dataArr.push(data));

    // Then I need to get the friend request I just created
    const FriendRequest = await db.UsersFriendReq.findOne({ where: { id: dataArr[2].id } });

    // Then add the request to each of the users
    dataArr[0].addUsersFriendReq(FriendRequest);
    dataArr[1].addUsersFriendReq(FriendRequest);

    res.json(dataArr);
  }
});

/*
==========================================================================================
Accepting a Friend Request from someone else - when button is clicked on FE
==========================================================================================
*/
router.put("/acceptFriendReq", async (req, res) => {
  const dataArr = [];
  // Assuming that I'm receiving the email Data of both users from the Front end, If that's the case, then I need to find the user id based off that
  /* BODY 
  {
    sender: email int that was stored on the Front End
    receiver: email int that was stored on the Front End
  }
  */
  const user = await db.Users.findOne({ where: { EmailId: req.body.sender } });
  dataArr.push(user);

  // Also find the Receiever of the Friend Request and their Dup
  const userDup = await db.UsersDup.findOne({ where: { EmailId: req.body.receiver } });
  dataArr.push(userDup);

  // Then I need to find the right request and the sender and update it based on where stuff
  await db.UsersFriendReq.update(
    // name the column prop you want to change, and the value you want to give it
    { accepted: true },
    // Then how are we going to find that row
    { where: { UserId: dataArr[0].id, UsersDupId: dataArr[1].id } }
  ).then(async (data) => {
    dataArr.push(data);
  });

  // Then add the connection between the two Users tables So it appears in the Friendships table --> It doesn't matter which table reference comes first
  user.addUsersDup(userDup);

  // Then delete the data in the FR Table
  await db.UsersFriendReq.destroy({ where: { accepted: true } }).then(async (data) => {
    dataArr.push(data);
  });

  res.json(dataArr);
});

/*
==========================================================================================
See your friend requests that you've sent out - INCOMPLETE, NEED TO FINISH FE FIRST
==========================================================================================
*/
router.put("/seeSentFriendReq", async (req, res) => {
  // If the data I'm getting from the FE is email data, I need to find the user based on that
  /* BODY 
  {
    email: email int that was stored on the Front End
  }
  */
  const dataArr = [];
  await db.Users.findOne({ where: { EmailId: req.body.email } }).then((data) => dataArr.push(data));
  // Here we are going to go to the FR table based on the info that was sent from the FE
  await db.UsersFriendReq.findAll({ where: { UserId: dataArr[0].id } }).then((data) => {
    dataArr.push(data);
  });

  res.json(dataArr[1]);
});

/*
==========================================================================================
See your friend requests that you've received out - INCOMPLETE, NEED TO FINISH FE FIRST
==========================================================================================
*/
router.put("/seeReceivedFriendReq", async (req, res) => {
  // If the data I'm getting from the FE is email data, I need to find the user based on that
  /* BODY 
  {
    email: email int that was stored on the Front End
  }
  */
  const dataArr = [];
  await db.Users.findOne({ where: { EmailId: req.body.email } }).then((data) => dataArr.push(data));
  // Here we are going to go to the FR table based on the info that was sent from the FE
  await db.UsersFriendReq.findAll({ where: { UserId: dataArr[0].id } }).then((data) => {
    dataArr.push(data);
  });

  res.json(dataArr[1]);
});

module.exports = router;
