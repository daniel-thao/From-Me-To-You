// "use strict";

const timeElasped = Date.now();
const today = new Date(timeElasped);
// { updatedAt: { type: DataTypes.DATE, defaultValue: today.toISOString() } },

module.exports = (sequelize, DataTypes) => {
  const Chat = sequelize.define(
    "Chat",
    { sortByRecentness: { type: DataTypes.BIGINT, defaultValue: timeElasped } },
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
    Chat.hasMany(models.Messages, {
      onDelete: "cascade",
    });
  };

  return Chat;
};
