// "use strict";
module.exports = (sequelize, DataTypes) => {
  const UsersFriendships = sequelize.define(
    "UsersFriendships",
    {
      myColumn: DataTypes.BOOLEAN,
    },
    {
      freezeTableName: true,
    }
  );
  return UsersFriendships;
};
