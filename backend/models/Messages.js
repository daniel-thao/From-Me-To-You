// "use strict";
module.exports = (sequelize, DataTypes) => {
  const Messages = sequelize.define(
    "Messages",
    {
      content: DataTypes.STRING(1234),
    },
    {
      freezeTableName: true,
    }
  );

  Messages.associate = function (models) {
    Messages.belongsTo(models.Users, {
      foreignKey: {
        allowNull: false,
      },
    });

    Messages.belongsTo(models.UsersDup, {
      foreignKey: {
        allowNull: false,
      },
    });
  };
  return Messages;
};
