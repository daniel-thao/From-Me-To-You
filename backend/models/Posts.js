// "use strict";
module.exports = (sequelize, DataTypes) => {
    const Posts = sequelize.define(
      "Posts",
      {
        content: DataTypes.STRING(1234),
      },
      {
        freezeTableName: true,
      }
    );
  
    Posts.associate = function (models) {
      Posts.belongsTo(models.Users, {
          foreignKey: {
              allowNull: false
          }
      })
    };
    return Posts;
  };
  