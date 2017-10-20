module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    recipeid: DataTypes.INTEGER,
    userid: DataTypes.INTEGER,
    message: DataTypes.STRING
  });

  Review.associate = (models) => {
    Review.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    Review.belongsTo(models.Recipe, {
      foreignKey: 'recipeId',
      onDelete: 'CASCADE',
    });
  };
  return Review;
};
