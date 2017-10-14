module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define('Recipe', {
    recipeName: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    author: DataTypes.STRING,
    prepTime: DataTypes.STRING,
    category: DataTypes.STRING,
    methods: DataTypes.STRING,
    ingredients: DataTypes.STRING,
    upvotes: DataTypes.INTEGER,
    downvotes: DataTypes.INTEGER,
  });

  Recipe.associate = (models) => {
    Recipe.belongsTo(models.User, {
      foreignKey: 'userid',
      onDelete: 'CASCADE',
    });
    Recipe.hasMany(models.Rating, {
      foreignKey: 'recipeid',
      onDelete: 'CASCADE',
    });
    Recipe.hasMany(models.Favorite, {
      foreignKey: 'recipeid',
      onDelete: 'CASCADE',
    });
    Recipe.hasMany(models.Review, {
      foreignKey: 'recipeid',
      onDelete: 'CASCADE',
    });
  };
  return Recipe;
};
