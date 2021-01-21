/*
SO THIS Actually creates two email rows but we don't want two email rows we just want one and then we want to link them together
*/
// Register a User
router.post("/register", async (req, res) => {
    const dataArr = [];
    /*
    So if I'm going to have emails seperate, then I need to do the emails first
    but I can do that in the includes portion, so Long as I specify the right table
    Once I add it to the Email DB, I need to then create the User Table and link them
    */
   console.log(`\n\n${req.body.email}\n\n`);
    await db.Users.create(
      {
        username: req.body.username,
        pw: req.body.pw,
        Email: {email: req.body.email},
      },
      { include: [db.Email] }
    ).then((data) => {
      dataArr.push(data);
    });
  
    await db.UsersDup.create(
      {
        username: req.body.username,
        pw: req.body.pw,
        Email: {email: req.body.email},
      },
      { include: [db.Email] }
    ).then((data) => {
      dataArr.push(data);
    });
  
    res.json(dataArr);
  });