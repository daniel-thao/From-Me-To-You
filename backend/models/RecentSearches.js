// "use strict";
module.exports = (sequelize, DataTypes) => {
    const RecentSearches = sequelize.define(
      "RecentSearches",
      {
        searched: DataTypes.STRING(1234),
      },
      {
        freezeTableName: true,
      }
    );
  
    RecentSearches.associate = function (models) {
      RecentSearches.belongsTo(models.Users, {
          foreignKey: {
              allowNull: false
          }
      })

      RecentSearches.belongsTo(models.UsersDup, {
        foreignKey: {
            allowNull: false
        }
    })
    };
    return RecentSearches;
  };
  