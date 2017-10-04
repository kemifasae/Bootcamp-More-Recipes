
module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define('Rating', {
    recipeid: DataTypes.NUMBER,
    rating: DataTypes.BOOLEAN,
    userid: DataTypes.NUMBER
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
