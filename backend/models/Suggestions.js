// "use strict";
module.exports = (sequelize, DataTypes) => {
  const Suggestions = sequelize.define(
    "Suggestions",
    {
      recommendation: DataTypes.STRING(1234),
      firstLetter: DataTypes.STRING,
      twoLetters: DataTypes.STRING,
      threeLetters: DataTypes.STRING,
      fourLetters: DataTypes.STRING,
      fiveLetters: DataTypes.STRING,
      sixLetters: DataTypes.STRING,
      sevenLetters: DataTypes.STRING,
      eightLetters: DataTypes.STRING,
      nineLetters: DataTypes.STRING,
      tenLetters: DataTypes.STRING,
      elevenLetters: DataTypes.STRING,
      twelveLetters: DataTypes.STRING,
      thirteenLetters: DataTypes.STRING,
      fourteenLetters: DataTypes.STRING,
      fifteenLetters: DataTypes.STRING,
      sixteenLetters: DataTypes.STRING
    },
    {
      freezeTableName: true,
    }
  );
  return Suggestions;
};
