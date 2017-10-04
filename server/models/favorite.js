'use strict';
module.exports = (sequelize, DataTypes) => {
  var Favorite = sequelize.define('Favorite', {
    favid: DataTypes.NUMBER,
    recipeid: DataTypes.NUMBER,
    userid: DataTypes.NUMBER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Favorite;
};