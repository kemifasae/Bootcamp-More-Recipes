module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    recipeid: DataTypes.INTEGER,
    userid: DataTypes.INTEGER,
    reviewmessage: DataTypes.STRING
  });

  Review.associate = (models) => {
    Review.belongsTo(models.User, {
      foreignKey: 'userid',
      onDelete: 'CASCADE',
    });
    Review.belongsTo(models.Recipe, {
      foreignKey: 'recipeid',
      onDelete: 'CASCADE',
    });
  };
  return Review;
};
