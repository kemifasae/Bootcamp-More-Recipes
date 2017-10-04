
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Favorites', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      recipeid: {
        type: Sequelize.NUMBER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'Recipe',
          key: 'id',
          as: 'recipeid',
        },
      },
      userid: {
        type: Sequelize.NUMBER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'User',
          key: 'id',
          as: 'userid',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: queryInterface => queryInterface.dropTable('Favorites'),
};
