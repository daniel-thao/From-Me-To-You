// "use strict";
const db = require("../models");

module.exports = (sequelize, DataTypes) => {
  const UsersDup = sequelize.define(
    "UsersDup",
    {
      username: DataTypes.STRING,
      pw: DataTypes.STRING,
      recentSearches: DataTypes.STRING(1234),
      isOnline: DataTypes.BOOLEAN,
    },
    {
      freezeTableName: true,
    }
  );

  UsersDup.associate = function (models) {
    UsersDup.belongsToMany(models.Users, {
      through: "UsersFriendships",
    });

    UsersDup.hasMany(models.UsersFriendReq);

    UsersDup.hasOne(models.Emails, {foreignKey: "email_id", as: "email_id"});

    UsersDup.hasMany(models.Posts);

  };
  
  return UsersDup;
};
