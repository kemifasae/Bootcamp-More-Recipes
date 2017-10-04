'use strict';
module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define('Recipe', {
    recipeid: DataTypes.NUMBER,
    recipename: DataTypes.STRING,
    userid: DataTypes.NUMBER,
    author: DataTypes.STRING,
    methods: DataTypes.STRING,
    ingredients: DataTypes.STRING
  });

    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Recipe;
};