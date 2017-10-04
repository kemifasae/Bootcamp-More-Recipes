'use strict';
module.exports = (sequelize, DataTypes) => {
  var Reviews = sequelize.define('Reviews', {
    reviewid: DataTypes.NUMBER,
    recipeid: DataTypes.NUMBER,
    reviewmessage: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Reviews;
};