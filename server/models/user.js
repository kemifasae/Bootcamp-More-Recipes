module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    displayname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  });
  User.associate = (models) => {
    User.hasMany(models.Recipe, {
      foreignKey: 'userId',
    });
    User.hasMany(models.Review, {
      foreignKey: 'userId',
    });
    User.hasMany(models.Favorite, {
      foreignKey: 'userId',
    });
  };
  return User;
};
