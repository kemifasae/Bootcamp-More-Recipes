'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    userid: DataTypes.NUMBER,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    displayname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return User;
};