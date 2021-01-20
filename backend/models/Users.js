// "use strict";
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    "Users",
    {
      username: DataTypes.STRING,
      pw: DataTypes.STRING,
      email: DataTypes.STRING,
      recentSearches: DataTypes.STRING(1234),
      isOnline: DataTypes.BOOLEAN,
    },
    {
      freezeTableName: true,
    }
  );

  Users.associate = function (models) {
    Users.belongsToMany(models.UsersDup, {
      through: "UsersFriendships",
    });

    Users.hasMany(models.UsersFriendReq);
  };

  //   Users.associate = function (models) {
  //     Users.belongsToMany(models.UsersDup, {
  //       through: "UsersFriendReq",
  //     });
  //   };

  //   Users.associate = function (models) {
  //     Users.hasOne(models.Emails, {
  //       foreignKey: {
  //         allowNull: false,
  //       },
  //     });
  //   };
  return Users;
};
