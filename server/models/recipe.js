

export default (sequelize, DataTypes) => {
  const Recipe = sequelize.define('Recipe', {
    recipename: DataTypes.STRING,
    userid: DataTypes.NUMBER,
    author: DataTypes.STRING,
    methods: DataTypes.STRING,
    ingredients: DataTypes.STRING,
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
