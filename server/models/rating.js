module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define('Rating', {
    recipeId: DataTypes.INTEGER,
    rating: DataTypes.BOOLEAN,
    userId: DataTypes.INTEGER,
  });

  Rating.associate = (models) => {
    Rating.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });

    Rating.belongsTo(models.Recipe, {
      foreignKey: 'recipeId',
      onDelete: 'CASCADE'
    });
  };
  return Rating;
};
