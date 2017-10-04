
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Recipes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      recipename: {
        type: Sequelize.STRING,
        allowNull: false
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
      author: {
        type: Sequelize.STRING
      },
      methods: {
        type: Sequelize.STRING,
        allowNull: false
      },
      ingredients: {
        type: Sequelize.STRING,
        allowNull: false
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
  down: queryInterface => queryInterface.dropTable('Recipes'),
};
