module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Reviews', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userid: {
        type: Sequelize.NUMBER,
        onDelete: 'CASCADE',
        references: {
          model: 'Recipe',
          key: 'id',
          as: 'recipeId',
        },
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
      reviewmessage: {
        type: Sequelize.STRING
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
  down: queryInterface => queryInterface.dropTable('Reviews'),
};
