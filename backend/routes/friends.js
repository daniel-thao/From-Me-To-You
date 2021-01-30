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
}

// This File will be mainly for the Friendship and FriendReq tables

/*
==========================================================================================
Get all the Data of Friendships and Friend Requests
==========================================================================================
*/
// router.get("/", async (req, res) => {
//   const dataArr = [];

//   await db.UsersFriendships.findAll({}).then((data) => {
//     dataArr.push(data);
//   });

//   await db.UsersFriendReq.findAll({}).then((data) => {
//     dataArr.push(data);
//   });

//   res.json(dataArr);
// });

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

  // IMPORTANT!!!!! Originally I was only going to send the email info to the FE and then get it back at this point, but along the way, that changed and I now am passing in the id's, usernames and timstamps of both users
  await db.Users.findOne({ where: { id: req.body.sender.id } }).then(async (data) => {
    dataArr.push(data);
  });

  // Also find the Receiever of the Friend Request and their Dup
  await db.UsersDup.findOne({
    where: { id: req.body.receiver.id },
  }).then(async (data) => {
    dataArr.push(data);
  });

  // Before I even create the FR, I need to see if it already exists in the FR table
  // So we are checking to see if the current sender already has a request in or if the receiver has actually sent a FR in the past to the current sender
  const senderCheck = await db.UsersFriendReq.findOne({
    where: { UserId: req.body.sender.id, UsersDupId: req.body.receiver.id },
  });

  const receiverCheck = await db.UsersFriendReq.findOne({
    where: { UserId: req.body.receiver.id, UsersDupId: req.body.sender.id },
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
    sender: id
    receiver: jwt token
  }
  */
  const user = await db.Users.findOne({ where: { id: req.body.sender.id } });
  dataArr.push(user);

  // Also find the Receiever of the Friend Request and their Dup
  const userDup = await db.UsersDup.findOne({ where: { id: req.body.receiver.id } });
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
Declining a Friend Request from someone else - when button is clicked on FE
==========================================================================================
*/
router.put("/declineFriendReq", async (req, res) => {
  const dataArr = [];
  // Assuming that I'm receiving the email Data of both users from the Front end, If that's the case, then I need to find the user id based off that
  /* BODY 
  {
    sender: id
    receiver: jwt token
  }
  */
  const user = await db.Users.findOne({ where: { id: req.body.sender.id } });
  dataArr.push(user);

  // Also find the Receiever of the Friend Request and their Dup
  const userDup = await db.UsersDup.findOne({ where: { id: req.body.receiver.id } });
  dataArr.push(userDup);

  // No need to update the Friendship table, just delete the data in the FR Table
  await db.UsersFriendReq.destroy({
    where: { UserId: req.body.sender.id, UsersDupId: req.body.receiver.id },
  }).then(async (data) => {
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
See your friend requests that you've received out
==========================================================================================
*/
router.put("/seeReceivedFriendReq", async (req, res) => {
  // If the data I'm getting from the FE is email data, I need to find the user based on that
  /* BODY 
  {
    jwt: current user's id
  }
  */
  const dataArr = [];
  // await db.Users.findOne({ where: { EmailId: req.body.email } }).then((data) => dataArr.push(data));

  // Here we are going to go to the FR table based on the info that was sent from the FE
  const receivedFR = await db.UsersFriendReq.findAll({ where: { UsersDupId: req.body.jwt.id } });

  // Then we need to get the username of the Sender and bring it to the FE
  for (let i = 0; i < receivedFR.length; i++) {
    await db.Users.findOne({ where: { id: receivedFR[i].UserId } }).then((data) =>
      dataArr.push({ username: data.username, id: data.id })
    );
  }

  res.json(dataArr);
});

/*
==========================================================================================
Clicked on your friends via Timeline or Friends of friends via timeline or anywhere else not related to the search bar
==========================================================================================
*/
router.put("/alreadyFriends", async (req, res) => {
  /* BODY
    { ---. Atleast their id
      jwt: current user
      person: {id, username}
    }
  */
  const dataArr = [];
  // console.log(req.body.person);

  // go into the friendShip Table and find all instances of friendships between the current user and other user
  const checkUserIdFriendship = await db.UsersFriendships.findOne({
    where: { UserId: req.body.jwt.id, UsersDupId: req.body.person.id },
  });
  const checkUserDupsIdFriendShip = await db.UsersFriendships.findOne({
    where: { UserId: req.body.person.id, UsersDupId: req.body.jwt.id },
  });

  // go into the FR Table and find all instances of friendships between the current user and other user
  const checkUserIdFR = await db.UsersFriendReq.findOne({
    where: { UserId: req.body.jwt.id, UsersDupId: req.body.person.id },
  });
  const checkUserDupsIdFR = await db.UsersFriendReq.findOne({
    where: { UserId: req.body.person.id, UsersDupId: req.body.jwt.id },
  });

  // Then push the data into the dataArr
  dataArr.push(checkUserIdFriendship, checkUserDupsIdFriendShip, checkUserIdFR, checkUserDupsIdFR);

  // Then essentially filter out which option is the right option for the
  res.json(
    dataArr.map((index) => {
      if (index !== null) {
        return index.createdAt;
      } else {
        return index;
      }
    })
  );
});

/*
==========================================================================================
Unfriend Someone via btn in Timeline
==========================================================================================
*/
router.delete("/unfriend", async (req, res) => {
  /* BODY
    { ---. Atleast their id
      jwt: current user
      person: {id, username}
    }

    ALSO IMPORTANT, as AXIOS, the DELETE info comes through the query property, not the body property
  */
  const dataArr = [];
  // console.log(req.query.jwt);
  // console.log(req.query.person);

  const currentUser = JSON.parse(req.query.jwt);
  const otherUser = JSON.parse(req.query.person);

  // go into the friendShip Table and find all instances of friendships between the current user and other user
  const checkUserIdFriendship = await db.UsersFriendships.destroy({
    where: { UserId: currentUser.id, UsersDupId: otherUser.id },
  });
  const checkUserDupsIdFriendShip = await db.UsersFriendships.destroy({
    where: { UserId: otherUser.id, UsersDupId: currentUser.id },
  });

  // Then push the data into the dataArr
  dataArr.push(checkUserIdFriendship, checkUserDupsIdFriendShip);

  // Then essentially filter out which option is the right option for the
  res.json(dataArr);
});

/*
==========================================================================================
Get all chats belonging to the current User
==========================================================================================
*/
router.put("/chats", async (req, res) => {
  /* BODY
    {
      jwt: current user
      checkAgainst: {}
    }

    ALSO IMPORTANT, as AXIOS, the DELETE info comes through the query property, not the body property
  */
  const dataArr = [];
  let alreadyStartedChat = false;

  // find all instances where the current user has a chat with someone else
  const checkUserId = await db.Chat.findAll({ where: { UserId: req.body.jwt.id } });
  const checkUsersDupId = await db.Chat.findAll({ where: { UsersDupId: req.body.jwt.id } });

  if (checkUserId.length !== 0) {
    checkUserId.map((index) =>
      dataArr.push({
        chatId: index.id,
        otherUserId: index.UsersDupId,
        sortBy: index.sortByRecentness,
      })
    );
  }

  if (checkUsersDupId.length !== 0) {
    checkUsersDupId.map((index) =>
      dataArr.push({ chatId: index.id, otherUserId: index.UserId, sortBy: index.sortByRecentness })
    );
  }

  // Now to find those users id's and usernames
  for (let i = 0; i < dataArr.length; i++) {
    const findOtherUser = await db.Users.findOne({ where: { id: dataArr[i].otherUserId } });
    dataArr[i].otherUser = findOtherUser.username;
  }

  function compare(a, b) {
    const bandA = a.sortBy;
    const bandB = b.sortBy;

    let comparison = 0;
    if (bandA > bandB) {
      comparison = 1;
    } else if (bandA < bandB) {
      comparison = -1;
    }
    return comparison;
  }

  // console.log("\n\n" + req.body.checkAgainst.id + "\n\n");
  // dataArr.map(index => {
  //   if(index.otherUserid === req.body.checkAgainst.id) {
  //     alreadyStartedChat = true;
  //   }
  // })

  res.json(dataArr.sort(compare).reverse());
});

/*
==========================================================================================
Find All Messages of the chat chosen
==========================================================================================
*/
router.put("/messages", async (req, res) => {
  /* BODY
    {
      jwt: current user
      chatInfo: {}
    }

    ALSO IMPORTANT, as AXIOS, the DELETE info comes through the query property, not the body property
  */
  const dataArr = [];

  let chatMessages = [];
  // find all messages that include the chat Id
  if (req.body.chatInfo.chatId) {
    chatMessages = await db.Messages.findAll({ where: { ChatId: req.body.chatInfo.chatId } });
  }

  if (chatMessages.length > 0) {
    chatMessages.map((index) =>
      dataArr.push({
        messages: index.content,
        sortBy: index.createdAt,
        sender: index.UserId,
        receiver: index.UsersDupId,
      })
    );
  }

  function compare(a, b) {
    const bandA = a.sortBy;
    const bandB = b.sortBy;

    let comparison = 0;
    if (bandA > bandB) {
      comparison = 1;
    } else if (bandA < bandB) {
      comparison = -1;
    }
    return comparison;
  }

  // Dont want to do the reverse here because the newest message will have a higher value since time goes forward
  res.json(dataArr.sort(compare));
});

/*
==========================================================================================
Find All Messages of the chat chosen
==========================================================================================
*/
router.post("/sendMessage", async (req, res) => {
  /* BODY
    {
      jwt: current user
      person: {},
      message: String
    }

    ALSO IMPORTANT, as AXIOS, the DELETE info comes through the query property, not the body property
  */
  const dataArr = [];

  // find all messages that include the chat Id
  const newMessage = await db.Messages.create({
    content: req.body.message,
    ChatId: req.body.person.chatId,
    UserId: req.body.jwt.id,
    UsersDupId: req.body.person.otherUserId,
  });

  res.json({ message: "sent" });
});

/*
==========================================================================================
Find All Friends, even without chats and send that info to FE
==========================================================================================
*/
router.put("/allFriendsForNewMsg", async (req, res) => {
  /* BODY
    {
      jwt: current user
    }
  */
  const dataArr = [];
  const friendIdArr = [];

  // FindAll friends of the Current User
  const checkFriendTableUserId = await db.UsersFriendships.findAll({
    where: { UserId: req.body.jwt.id },
  });
  const checkFriendTableUsersDupId = await db.UsersFriendships.findAll({
    where: { UsersDupId: req.body.jwt.id },
  });

  // Then put them in the data Arr
  if (checkFriendTableUserId.length > 0) {
    checkFriendTableUserId.map((index) => friendIdArr.push({ otherUserId: index.UsersDupId }));
  }

  if (checkFriendTableUsersDupId.length > 0) {
    checkFriendTableUsersDupId.map((index) => friendIdArr.push({ otherUserId: index.UserId }));
  }

  // Now that I have all the friends, I need to check the chats that are linked to the current user
  const checkChatUserId = await db.Chat.findAll({ where: { UserId: req.body.jwt.id } });
  const checkChatUsersDupId = await db.Chat.findAll({ where: { UsersDupId: req.body.jwt.id } });

  if (checkChatUserId.length > 0) {
    checkChatUserId.map((index) => {
      for (let i = 0; i < friendIdArr.length; i++) {
        if (index.UsersDupId === friendIdArr[i].otherUserId) {
          friendIdArr[i].chatId = index.id;
          friendIdArr[i].sortBy = index.sortByRecentness;
        }
      }
    });
  }

  if (checkChatUsersDupId.length > 0) {
    checkChatUsersDupId.map((index) => {
      for (let i = 0; i < friendIdArr.length; i++) {
        if (index.UserId === friendIdArr[i].otherUserId) {
          friendIdArr[i].chatId = index.id;
          friendIdArr[i].sortBy = index.sortByRecentness;
        }
      }
    });
  }

  // Then get the name of the friends
  for (let i = 0; i < friendIdArr.length; i++) {
    const friendsName = await db.Users.findOne({ where: { id: friendIdArr[i].otherUserId } });
    friendIdArr[i].otherUserName = friendsName.username;
  }

  res.json(friendIdArr);
});

/*
==========================================================================================
Start a new Chat with a friend either you clicked chat with someone else
==========================================================================================
*/
router.post("/newChat", async (req, res) => {
  /* BODY
    {
      jwt: current user
      person: {},
      message: String
    }

    ALSO IMPORTANT, as AXIOS, the DELETE info comes through the query property, not the body property
  */
  const dataArr = [];

  // First create a new Chat
  const newChat = await db.Chat.create({
    sortByRecentness: Date.now(),
    UserId: req.body.jwt.id,
    UsersDupId: req.body.person.otherUserId,
  });

  // Then create that message
  const newMessageForNewChat = await db.Messages.create({
    content: req.body.message,
    ChatId: newChat.id,
    UserId: req.body.jwt.id,
    UsersDupId: req.body.person.otherUserId,
  });

  dataArr.push(newChat, newMessageForNewChat);
  res.json(dataArr);
});

module.exports = router;
