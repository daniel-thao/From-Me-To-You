// "use strict";
module.exports = (sequelize, DataTypes) => {
    const ProductTagJoin = sequelize.define(
      "ProductTagJoin",
      {
        myColumn: DataTypes.STRING(1234),
      },
      {
        freezeTableName: true,
      }
    );
  
    // ProductTagJoin.associate = function (models) {
    //     ProductTagJoin.belongsToMany(models.TagTest, {
    //         through: models.ProductTagJoin
    //     })
    //   };
    return ProductTagJoin;
  };
  