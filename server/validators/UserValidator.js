import validator from 'validatorjs';


require('dotenv').config();

export default class UserValidator {
  /**
   * Method checks if user trying to access login is a registered user
   * 
   * @static
   * @param {any} request 
   * @param {any} response 
   * @param {any} user 
   * @returns {boolean} true if registered and false if not with a message to sign up
   * @memberof UserValidator
   */
  static isUser(request, response, user) {
    if (!user) {
      if (request.url === '/api/v1/users/login') {
        response.status(401).send({
          message: 'Please Sign Up'
        });
        return false;
      }
      response.status(404).send({
        message: 'User Not Found'
      });
      return false;
    }
    return true;
}
  /**
   * Method checks if user input parameters are valid
   * 
   * @static 
   * @param {object} request user request 
   * @param {object} response server response
   * @param {function} next any function to be performed next
   * @returns {boolean} true or false
   * @memberof UserValidator
   */
  static isParamValid(request, response, next) {
    if (request.body.email === '' || validator.isEmpty(request.body.email)) {
      response.status(400).send({
        message: 'Email is Required',
      });
      return false;
    }
    if (request.body.password === '' || validator.isEmpty(request.body.password)) {
      response.status(400).send({
        message: 'Password is Required',
      });
      return false;
    }
    if (request.body.email && !(validator.isEmail(request.body.email))) {
      response.status(400).send({
        message: 'Invalid Email',
      });
      return false;
    }
    next();
}
}
