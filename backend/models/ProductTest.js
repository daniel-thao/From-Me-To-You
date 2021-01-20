// "use strict";
module.exports = (sequelize, DataTypes) => {
    const ProductTest = sequelize.define(
      "ProductTest",
      {
        title: DataTypes.STRING(1234),
      },
      {
        freezeTableName: true,
      }
    );
  
    ProductTest.associate = function (models) {
        ProductTest.belongsToMany(models.TagTest, {
            through: models.ProductTagJoin
        })
      };
    return ProductTest;
  };
  