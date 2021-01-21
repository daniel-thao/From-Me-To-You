// "use strict";
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
      through: models.UsersFriendships,
    });

    UsersDup.hasMany(models.UsersFriendReq);

    UsersDup.belongsTo(models.Emails, {
      foreignKey: {
        allowNull: false,
      },
    });

    UsersDup.hasMany(models.Posts);
  };

  return UsersDup;
};
