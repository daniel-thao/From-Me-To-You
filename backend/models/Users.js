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
      through: models.UsersFriendships,
    });

    Users.hasMany(models.UsersFriendReq);

    Users.belongsTo(models.Emails, {
      foreignKey: {
        allowNull: false,
      },
    });

    Users.hasMany(models.Posts);
    Users.hasMany(models.RecentSearches);
    Users.hasMany(models.Chat);
    Users.hasMany(models.Messages);


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
