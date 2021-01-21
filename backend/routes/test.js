// Bring in Express
const express = require("express");

// Make the middleware for express
const router = express.Router();

// Bring in the right database model structure
const db = require("../models");

// console.log(db.Users + "");
router.get("/", (req, res) => {
  db.Users.findAll({}).then((newUser) => {
    res.json(newUser);
  });
});

router.post("/tag", async (req, res) => {
  const newTag = await db.TagTest.create({
    name: req.body.name,
  });

  res.json(newTag);
});

router.post("/friendReq", async (req, res) => {
    const newTag = await db.UsersFriendReq.create({
      myColumn: req.body.myColumn,
    });
  
    res.json(newTag);
  });

// This is how to create something with the associations, but how to do it without creating it?
router.post("/", async (req, res) => {
  const newActor = await db.ProductTest.create(
    {
      title: req.body.title,
      //   This needs to be the plural name of the database, idk why, but you need this first
      //   TagTests: [{name: "whatever"}, {name: "you Want"}, {name: "to Put"}]
    //   Otherwise do what is down below
      TagTests: req.body.TagTests,
    },
    // Then the include here is actually referencing the table in the DB and Sequelize will do the connecting
    { include: [db.TagTest] }
  );

  res.json(newActor);
});

/*
So with this type of route, I'm able to have users befriend eachother down the road, however, am I able to see the data later on?
*/
router.post("/laterDateAssociate", async (req, res) => {
  const findUser = await db.ProductTest.findOne({ where: { id: 2 } });
  const findPost = await db.TagTest.findOne({ where: { id: 4 } });
  /* when you do the add() method, it also needs to include the name of the Table that you want to associate
So therefore, the outcome is addTagTest --> addNameOfDB. Also, you need to then pass the info you want to associate with each other
*/
  findUser.addTagTest(findPost);

  res.json(findPost);
});


// So you can only see the data if you've intentionally created a model in which the other two models will associate with
// If you don't have an intentional Table to Relate the other two together, then it will def be a pain to get the data
router.get("/getAssociations", async (req, res) => {
    // General get all of the data
//   const getJoins = await db.ProductTagJoin.findAll({});

//   Get based on certain Criteria
const getJoins = await db.ProductTagJoin.findAll({where : {ProductTestId: 1}});


  res.json(getJoins);
});


// Testing Super Many-To-Many route that basically adds things to a model that
router.post("/superManyToMany", async (req, res) => {
    // Here I need to find the User and their Duplicate
    const findUserDup = await db.UsersDup.findOne({ where: { id: 2 } });
    const findUser = await db.Users.findOne({ where: { id: 3 } });

    // Then I need to get the friend request
    const FriendRequest = await db.UsersFriendReq.findOne({ where: { id: 1 } });

    // Then add the request to each of the users
    findUser.addUsersFriendReq(FriendRequest);
    findUserDup.addUsersFriendReq(FriendRequest);

  
    res.json(FriendRequest);
  });


module.exports = router;
