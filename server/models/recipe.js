module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define('Recipe', {
    recipeName: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    prepTime: DataTypes.STRING,
    category: DataTypes.STRING,
    methods: DataTypes.STRING,
    ingredients: DataTypes.STRING,
    upvotes: DataTypes.INTEGER,
    downvotes: DataTypes.INTEGER,
  });

  Recipe.associate = (models) => {
    Recipe.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    Recipe.hasMany(models.Rating, {
      foreignKey: 'recipeId',
      onDelete: 'CASCADE',
    });
    Recipe.hasMany(models.Favorite, {
      foreignKey: 'recipeId',
      onDelete: 'CASCADE',
    });
    Recipe.hasMany(models.Review, {
      foreignKey: 'recipeId',
      onDelete: 'CASCADE',
    });
  };
  return Recipe;
};
