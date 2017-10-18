import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Validator from 'validatorjs';

require('dotenv').config();

const User = require('../models').User;

const userRules = {
  firstame: 'required|between:3,20',
  lastname: 'required|between:3,25',
  displayname: 'required|between:6,15',
  email: 'required|email',
  password: 'required|min:8',
};
const loginRules = {
  email: 'required|email',
  password: 'required|min:8',
};

const saltRounds = 10;

/**
 * @description Contains all Users Related Functions
 * @export
 * @class UserController
 */
export default class UserController {
  /**
   * @description Allows Users to signup
   * @static
   * @param {object} request Client's request
   * @param {object} response Server Response
   * @returns {object} response which includes status and message
   * @memberof UserController
   */
  static create(request, response) {
    return User
      .findOne({
        where: {
          email: request.body.email,
        },
      })
      .then((user) => {
        if (!user) {
          const validate = new Validator(request.body, userRules);
          if (validate.passes()) {
            bcrypt.hash(request.body.password, saltRounds, (err, hash) => {
              return User
                .create({
                  firstname: request.body.firstname,
                  lastname: request.body.lastname,
                  displayname: request.body.displayname,
                  email: request.body.email,
                  password: hash,
                })
                .then((createdUser) => {
                  delete createdUser.dataValues.password;
                  resonse.status(201).json({
                    status: 'Success',
                    data: {
                      userName: `${createdUser.firstName}
                    ${createdUser.lastname}`,
                    },
                  });
                })
                .catch(error => response.status(500).send(error.toString()));
            });
          }
          response.status(400).json({
            status: 'Unsuccessful',
            message: 'Invalid data input',
            errors: validator.errors.all(),
          });
        }
        return response.status(200).send({
          status: 'Found',
          message: 'User already exists!'
        });
      })
      .catch(error => response.status(500).send(error.toString()));
  }


  static login(request, response) {
    if (request.body.email && request.body.password) {
      const validate = new Validator(request.body, loginRules);
      if (validate.passes()) {
        return User
          .find({
            where: {
              email: request.body.email
            },
            attributes: {
              exclude: ['createdAt', 'updatedAt']
            },
          })
          .then((user) => {
            if (user) {
              bcrypt.compare(
                request.body.password,
                user.dataValues.password, (err, resp) => {
                  if (resp === false) {
                    return response.status(400).send({
                      message: 'Wrong Password',
                    });
                  }
                  const token = jwt.sign(
                    { id: user.dataValues.id, email: user.dataValues.email },
                    process.env.JWT_SECRET, { expiresIn: 60 * 60 });
                  delete user.dataValues.password;
                  return response.status(200).send({
                    message: 'login successful', user, token
                  });
                });
            } else {
              return response.status(404).json({
                status: 'Unsuccessful',
                message: 'User not found',
              });
            }
          })
          .catch(error => response.status(500).send(error.toString()));
      }
      response.status(400).json({
        status: 'Unsuccessful',
        message: 'Invalid data input',
        errors: validator.errors.all(),
      });
    }
    return response.status(400).send({
      message: 'Invalid Parameters'
    });
  }
}

