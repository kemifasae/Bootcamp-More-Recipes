
export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userid: DataTypes.NUMBER,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    displayname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  });

  User.associate = (models) => {
    User.hasMany(models.Recipe, {
      foreignKey: 'userid',
    });
    User.hasMany(models.Review, {
      foreignKey: 'userid',
    });
    User.hasMany(models.Favorite, {
      foreignKey: 'userid',
    });
  };
  return User;
};
