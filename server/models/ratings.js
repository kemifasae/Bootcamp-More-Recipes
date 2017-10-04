'use strict';
module.exports = (sequelize, DataTypes) => {
  var Ratings = sequelize.define('Ratings', {
    recipeid: DataTypes.NUMBER,
    rating: DataTypes.BOOLEAN,
    userid: DataTypes.NUMBER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Ratings;
};