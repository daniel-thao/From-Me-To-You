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
            username: req.body.username.toLowerCase().trim(),
            pw: hash,
            EmailId: dataArr[0].id,
          }).then((data) => {
            dataArr.push(data);
          });

          await db.UsersDup.create({
            username: req.body.username.toLowerCase().trim(),
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
Mark User that is Online --> Incomplete
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
See the Post user just made --> Incomplete, Still need to se posts from other users
==========================================================================================
*/
router.post("/genUserPost", async (req, res) => {
  const getAllUserIds = [];
  let postArr;

  // Since we have the id of the direct user in the JwtToken, we just need to create the post and pass the id for both columns of the UserId and the DupId

  await db.Posts.findAll({ where: { UserId: req.body.jwt.id } }).then((data) => {
    getAllUserIds.push(data.map((index) => index.UserId));
    postArr = data.map((index) => {
      return { timeStamp: index.createdAt, post: index.content };
    });
  });

  for (let i = 0; i < getAllUserIds[0].length; i++) {
    await db.Users.findOne({ where: { id: getAllUserIds[0][i] } }).then(async (data) => {
      postArr[i].user = data.username;
    });
  }

  // findUserArr.push(nameOfUsersArr);

  res.json(postArr);
});

/*
==========================================================================================
User just Searched Something
==========================================================================================
*/
router.post("/activateSearch", async (req, res) => {
  /* BODY
    {
      jwt: UserToken obj
      userInput: "string"
    }
  */
  const dataArr = [];
  if (req.body.userInput !== "") {
    // Check the Recent Search Tables on if there are too many searches made by a certain user
    await db.RecentSearches.findAll({
      where: { UserId: req.body.jwt.id },
    }).then(async (recentData) => {
      if (recentData.length > 9) {
        await db.RecentSearches.destroy({ where: { id: recentData[0].id } });
      }
    });

    await db.RecentSearches.create({
      searched: req.body.userInput,
      UserId: req.body.jwt.id,
      UsersDupId: req.body.jwt.id,
    });

    // we also want to store up the suggestions Table as well
    console.log(`\n\n${req.body.userInput.substring(0, 1)}\n\n`);
    const noDbls = await db.Suggestions.findOne({
      where: {
        recommendation: req.body.userInput,
      },
    });
    if (noDbls === null) {
      await db.Suggestions.create({
        recommendation: req.body.userInput,
        firstLetter: req.body.userInput.substring(0, 1),
        twoLetters: req.body.userInput.substring(0, 2),
        threeLetters: req.body.userInput.substring(0, 3),
        fourLetters: req.body.userInput.substring(0, 4),
        fiveLetters: req.body.userInput.substring(0, 5),
        sixLetters: req.body.userInput.substring(0, 6),
        sevenLetters: req.body.userInput.substring(0, 7),
        eightLetters: req.body.userInput.substring(0, 8),
        nineLetters: req.body.userInput.substring(0, 9),
        tenLetters: req.body.userInput.substring(0, 10),
        elevenLetters: req.body.userInput.substring(0, 11),
        twelveLetters: req.body.userInput.substring(0, 12),
        thirteenLetters: req.body.userInput.substring(0, 13),
        fourteenLetters: req.body.userInput.substring(0, 14),
        fifteenLetters: req.body.userInput.substring(0, 15),
        sixteenLetters: req.body.userInput.substring(0, 16),
      });
    }
  }

  const recentSearchResults = await db.RecentSearches.findAll({
    where: { UserId: req.body.jwt.id },
  });

  dataArr.push(
    recentSearchResults.map((index) => {
      return { searched: index.searched, key: index.createdAt };
    })
  );

  // Create a search in the Recent Searches Table

  res.json(dataArr);
});

/*
==========================================================================================
Get Suggestions for Searching
==========================================================================================
*/
router.put("/suggestions", async (req, res) => {
  /* BODY
    {
      userInput: "string"
    }
  */
  const dataArr = [];
  const helper = async function (string, propChooser, stringBegin, stringEnd) {
    await db.Suggestions.findAll({
      // adding the [] around the keys make them dynamic
      where: { [propChooser]: string.substring(stringBegin, stringEnd) },
    }).then((data) => {
      const dataSorted = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []];

      for (let i = 0; i < data.length; i++) {
        // const dataObj = {};
        if (i < 8) {
          dataSorted[0].push(data[i].recommendation);
        } else if (i > 7 && i < 16) {
          dataSorted[1].push(data[i].recommendation);
        } else if (i > 15 && i < 24) {
          dataSorted[2].push(data[i].recommendation);
        } else if (i > 23 && i < 32) {
          dataSorted[3].push(data[i].recommendation);
        } else if (i > 31 && i < 40) {
          dataSorted[4].push(data[i].recommendation);
        } else if (i > 39 && i < 48) {
          dataSorted[5].push(data[i].recommendation);
        } else if (i > 47 && i < 56) {
          dataSorted[6].push(data[i].recommendation);
        } else if (i > 55 && i < 64) {
          dataSorted[7].push(data[i].recommendation);
        } else if (i > 63 && i < 72) {
          dataSorted[8].push(data[i].recommendation);
        } else if (i > 71 && i < 80) {
          dataSorted[9].push(data[i].recommendation);
        } else if (i > 79 && i < 88) {
          dataSorted[10].push(data[i].recommendation);
        } else if (i > 87 && i < 96) {
          dataSorted[11].push(data[i].recommendation);
        } else if (i > 95 && i < 104) {
          dataSorted[12].push(data[i].recommendation);
        } else if (i > 103 && i < 112) {
          dataSorted[13].push(data[i].recommendation);
        } else if (i > 111 && i < 120) {
          dataSorted[14].push(data[i].recommendation);
        } else if (i > 119 && i < 128) {
          dataSorted[15].push(data[i].recommendation);
        }
      }
      res.json(dataSorted);
    });
  };

  const propertyManager = [
    "firstLetter",
    "twoletters",
    "threeLetters",
    "fourLetters",
    "fiveLetters",
    "sixLetters",
    "sevenLetters",
    "eightLetters",
    "nineLetters",
    "tenLetters",
    "elevenLetters",
    "twelveLetters",
    "thirteenLetters",
    "fourteenLetters",
    "fifteenLetters",
    "sixteenLetters",
  ];
  console.log(`\n\n${req.body.userInput}\n\n`);
  switch (req.body.userInput.length) {
    case 1:
      return helper(req.body.userInput, propertyManager[0], 0, 1);
    case 2:
      return helper(req.body.userInput, propertyManager[1], 0, 2);
    case 3:
      return helper(req.body.userInput, propertyManager[2], 0, 3);
    case 4:
      return helper(req.body.userInput, propertyManager[3], 0, 4);
    case 5:
      return helper(req.body.userInput, propertyManager[4], 0, 5);
    case 6:
      return helper(req.body.userInput, propertyManager[5], 0, 6);
    case 7:
      return helper(req.body.userInput, propertyManager[6], 0, 7);
    case 8:
      return helper(req.body.userInput, propertyManager[7], 0, 8);
    case 9:
      return helper(req.body.userInput, propertyManager[8], 0, 9);
    case 10:
      return helper(req.body.userInput, propertyManager[9], 0, 10);
    case 11:
      return helper(req.body.userInput, propertyManager[10], 0, 11);
    case 12:
      return helper(req.body.userInput, propertyManager[11], 0, 12);
    case 13:
      return helper(req.body.userInput, propertyManager[12], 0, 13);
    case 14:
      return helper(req.body.userInput, propertyManager[13], 0, 14);
    case 15:
      return helper(req.body.userInput, propertyManager[14], 0, 15);
    case 16:
      return helper(req.body.userInput, propertyManager[15], 0, 16);
    default:
      return;
  }
});

/*
==========================================================================================
Find All users from just searching --> INCOMPLETE, need to be able to distinguish between who's already a friend and who's not
==========================================================================================
*/
router.put("/finishedSearch", async (req, res) => {
  /* BODY
    {
      justSearched: "username",
      jwt: user
    }
  */
  const dataArr = [];
  // Search the Users Table for those usernames, not emails and return all those users with that name
  const allUsernames = await db.Users.findAll({
    where: { username: req.body.justSearched.toLowerCase() },
  });

  allUsernames.filter((index) => {
    if (index.id !== req.body.jwt.id) {
      return dataArr.push({ id: index.id, username: index.username, timeStamp: index.createdAt });
    }
  });

  res.json(dataArr);
});

/*
==========================================================================================
Display all user's friends
==========================================================================================
*/
router.put("/friends", async (req, res) => {
  /* BODY
    {
      jwt: user
    }
  */
  const dataArr = [];
  // Search the FriendShip Table for user's id, not emails and return all those users with that name
  const checkUserId = await db.UsersFriendships.findAll({ where: { UserId: req.body.jwt.id } });

  // Also need to check the userDupId's because I've set it up as sender receiver, so someone can be a friend of another person but was orriginallly the receiver of that req
  const checkUsersDupId = await db.UsersFriendships.findAll({
    where: { UsersDupId: req.body.jwt.id },
  });

  function friend(data) {
    const friendObj = {};
    friendObj.username = data.username;
    friendObj.id = data.id;
    dataArr.push(friendObj);
  }

  // Choose only some of the data
  for (let i = 0; i < checkUsersDupId.length; i++) {
    await db.Users.findOne({ where: { id: checkUsersDupId[i].id } }).then((userData) => {
      friend(userData);
    });
  }

  // randomize the data just for the heck of it
  const randomize = function (dataArr) {
    let currentIndex = dataArr.length;

    while (currentIndex !== 0) {
      const randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      let temporaryValue = dataArr[currentIndex];
      dataArr[currentIndex] = dataArr[randomIndex];
      dataArr[randomIndex] = temporaryValue;
    }
  };

  randomize(dataArr);

  res.json(dataArr);
});

module.exports = router;
