
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    recipeid: DataTypes.NUMBER,
    userid: DataTypes.NUMBER,
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
    return Reviews;
  };
};
