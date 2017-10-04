

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstname: {
        type: Sequelize.STRING(50),
        allowNull: false,
        validate: {
          len: {
            args: [0, 50],
            msg: 'Your Firstname should be less or equal to 50 characters'
          }
        }
      },
      lastname: {
        type: Sequelize.STRING(50),
        allowNull: false,
        validate: {
          len: {
            args: [0, 50],
            msg: 'Your Firstname should be less or equal to 50 characters'
          }
        }
      },
      displayname: {
        type: Sequelize.STRING(10),
        allowNull: false,
        validate: {
          len: {
            args: [0, 10],
            msg: 'Your Displayname should be less or equal to 50 characters'
          }
        }
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isEmail: {
            msg: 'Invalid email address, please check properly',
          },
          isUnique: connection.validateIsUnique(
            'email',
            'Email address already exists.'
          )
        },
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
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
  down: queryInterface => queryInterface.dropTable('Users'),
};
