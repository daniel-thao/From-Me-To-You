// "use strict";
module.exports = (sequelize, DataTypes) => {
  const Emails = sequelize.define(
    "Emails",
    {
      content: DataTypes.STRING(1234),
    },
    {
      freezeTableName: true,
    }
  );

  Emails.associate = function (models) {
    Emails.belongsTo(models.Users, {});
    Emails.belongsTo(models.UsersDup, {});

  };
  return Emails;
};
