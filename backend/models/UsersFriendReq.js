// "use strict";
module.exports = (sequelize, DataTypes) => {
  const UsersFriendReq = sequelize.define(
    "UsersFriendReq",
    {
      myColumn: DataTypes.BOOLEAN,
    },
    {
      freezeTableName: true,
    }
  );

  UsersFriendReq.associate = function (models) {
    UsersFriendReq.belongsTo(models.Users);
    UsersFriendReq.belongsTo(models.UsersDup);
    };
  return UsersFriendReq;
};
