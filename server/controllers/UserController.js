import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

require('dotenv').config();

const User = require('../models').User;

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
                    userName: `${createdUser.firstName} ${createdUser.lastname}`,
                  },
                });
              })
              .catch(error => response.status(500).send(error.toString()));
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
            request.body.password, user.dataValues.password, (err, resp) => {
              if (resp === false) {
                return response.status(400).send({
                  message: 'Wrong Password',
                });
              }
              const token = jwt.sign({ email: user.dataValues.email }, process.env.JWT_SECRET, { expiresIn: 60 * 60 });
              delete user.dataValues.password;
              return response.status(200).send({
                message: 'login successful', user, token });
            });
        } else {
          return response.status(401).json({
            status: 'Unsuccessful',
            message: 'User not found',
          });
        }
      })
      .catch(error => response.status(500).send(error.toString()));
    }
  return response.status(200).send({
    message: 'Invalid Parameters', user, token });
    }
}

