const router = require("express").Router();

// Just add more router.(whatevers) here and they will be added to the pool of routes
router.use("/users", require("./users"));
router.use("/friends", require("./friends"));
router.use("/test", require("./test"));

module.exports = router;
// module.exports = {
//   User: require("./user"),
// };
