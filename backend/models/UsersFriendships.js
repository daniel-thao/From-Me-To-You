// "use strict";
module.exports = (sequelize, DataTypes) => {
  const UsersFriendships = sequelize.define(
    "UsersFriendships",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
    }
  );
  return UsersFriendships;
};
