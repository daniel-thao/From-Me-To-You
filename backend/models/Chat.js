// "use strict";
module.exports = (sequelize, DataTypes) => {
  const Chat = sequelize.define(
    "Chat",
    {},
    {
      freezeTableName: true,
    }
  );

  Chat.associate = function (models) {
    Chat.belongsTo(models.Users, {
      foreignKey: {
        allowNull: false,
      },
    });

    Chat.belongsTo(models.UsersDup, {
      foreignKey: {
        allowNull: false,
      },
    });
  };
  return Chat;
};
