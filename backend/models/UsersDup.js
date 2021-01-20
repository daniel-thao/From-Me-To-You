// "use strict";
module.exports = (sequelize, DataTypes) => {
  const UsersDup = sequelize.define(
    "UsersDup",
    {
      username: DataTypes.STRING,
      pw: DataTypes.STRING,
      recentSearches: DataTypes.STRING(1234),
      isOnline: DataTypes.BOOLEAN,
      email: DataTypes.STRING, // I need to make this it's own seperate table so that I can simply go through the emails I have when new users want to create accounts and then I need to associate from here
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
  };

  //   UsersDup.associate = function (models) {
  //     UsersDup.belongsToMany(models.Users, {
  //       through: "UsersFriendReq",
  //     });
  //   };

  // UsersDup.associate = function (models) {
  //     UsersDup.hasOne(models.Emails, {
  //       foreignKey: {
  //         allowNull: false,
  //       },
  //     });
  //   };
  return UsersDup;
};
