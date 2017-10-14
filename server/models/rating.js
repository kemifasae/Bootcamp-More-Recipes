module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define('Rating', {
    recipeid: DataTypes.INTEGER,
    rating: DataTypes.BOOLEAN,
    userid: DataTypes.INTEGER,
  });

  Rating.associate = (models) => {
    Rating.belongsTo(models.User, {
      foreignKey: 'userid',
      onDelete: 'CASCADE',
    });

    Rating.belongsTo(models.Recipe, {
      foreignKey: 'recipeid',
      onDelete: 'CASCADE'
    });
  };
  return Rating;
};
