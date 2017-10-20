module.exports = (sequelize, DataTypes) => {
  const Favorite = sequelize.define('Favorite', {
    recipeId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
  });

  Favorite.associate = (models) => {
    Favorite.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });

    Favorite.belongsTo(models.Recipe, {
      foreignKey: 'recipeId',
      onDelete: 'CASCADE'
    });
  };
  return Favorite;
};
