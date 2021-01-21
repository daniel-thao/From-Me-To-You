// "use strict";
module.exports = (sequelize, DataTypes, models) => {
  const Users = sequelize.define(
    "Users",
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

  Users.associate = function (models) {
    Users.belongsToMany(models.UsersDup, {
      through: "UsersFriendships",
    });

    Users.hasMany(models.UsersFriendReq);

    Users.hasOne(models.Emails, { foreignKey: "email_id", as: "email_id" });

    Users.hasMany(models.Posts);
  };

  //   Users.associate = function (models) {
  //     Users.hasOne(models.Emails, {
  //       foreignKey: {
  //         allowNull: false,
  //       },
  //     });
  //   };
  return Users;
};
