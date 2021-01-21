// "use strict";
module.exports = (sequelize, DataTypes) => {
  const UsersFriendReq = sequelize.define(
    "UsersFriendReq",
    {
      accepted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      freezeTableName: true,
    }
  );

  UsersFriendReq.associate = function (models) {
    // Idk how to get rid of the id columns but just know that
    // Original Users Table = Sender
    UsersFriendReq.belongsTo(models.Users);
    // Duplicate Table = Receiver
    UsersFriendReq.belongsTo(models.UsersDup);
  };
  return UsersFriendReq;
};
