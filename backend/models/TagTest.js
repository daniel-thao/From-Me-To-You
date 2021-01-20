// "use strict";
module.exports = (sequelize, DataTypes) => {
    const TagTest = sequelize.define(
      "TagTest",
      {
        name: DataTypes.STRING(1234),
      },
      {
        freezeTableName: true,
      }
    );
  
    TagTest.associate = function (models) {
        TagTest.belongsToMany(models.ProductTest, {
            through: models.ProductTagJoin
        })
      };
    return TagTest;
  };
  