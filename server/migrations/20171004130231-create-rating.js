
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Rating', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      recipeid: {
        type: Sequelize.NUMBER,
        onDelete: 'CASCADE',
        references: {
          model: 'Recipe',
          key: 'id',
          as: 'recipeId',
        },
      },
      rating: {
        type: Sequelize.BOOLEAN
      },
      userid: {
        type: Sequelize.NUMBER,
        onDelete: 'CASCADE',
        references: {
          model: 'User',
          key: 'id',
          as: 'userId',
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
  down: queryInterface => queryInterface.dropTable('Rating'),
};
