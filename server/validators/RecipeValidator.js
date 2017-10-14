import validator from 'validatorjs';
import jwt from 'jsonwebtoken';

require('dotenv').config();

/**
 * 
 * 
 * @export
 * @class RecipeValidator
 */
export default class RecipeValidator {

/**
 * Checks if the required recipe fields are not empty
 * 
 * @static
 * @param {object} request Client request to server 
 * @param {object} response Server response
 * @param {function} next Tells next function to execute
 * @returns {boolean} false
 * @memberof RecipeValidator
 */
  static isRecipeComplete(request, response, next) {
    if (!request.body.recipename && validator.isEmpty(request.body.recipename)) {
      response.status(400).send({
        message: 'Your Recipe has to have a name!',
      });
      return false;
    }
    if (!request.body.methods && validator.isEmpty(request.body.methods)) {
      response.status(400).send({
        message: 'You have to include the process of using this recipe!',
      });
      return false;
    }
    if (!request.body.ingredients && validator.isEmpty(request.body.ingredients)) {
      response.status(400).send({
        message: 'Please include the necessary ingredients!',
      });
      return false;
    } 
    next();
  }

  /**
   * Method checks if review to be posted for a recipe is empty or not
   * 
   * @static
   * @param {object} request 
   * @param {object} response 
   * @param {function} next 
   * @returns 
   * @memberof RecipeValidator
   */
  static isReview(request, response, next) {
    if (!request.body.reviewmessage && validator.isEmpty(request.body.reviewmessage)) {
      response.status(400).send({
        message: 'You cannot make an empty review',
      });
      return false;
    }
    next();
  }


  /**
   * Method checks for who is allowed to update a recipe
   * 
   * @static
   * @param {object} request 
   * @param {object} response 
   * @param {number} userid 
   * @returns true or false
   * @memberof RecipeValidator
   */
  static allowUpdate(request, response, userid) {
    if (request.loggedInUser.userid !== parseInt(userid)) {
      response.status(403).send({
        message: 'You cannot update someone else\'s recipe',
      });
      return false;
    }
    return true;
}

  /**
   * Validates user input when adding a new recipe
   * 
   * @static
   * @param {object} request from user
   * @param {object} response from server 
   * @returns {boolean} true or false
   * @memberof RecipeValidator
   */
  static isValidParams(request, response) {
    if (!request.body.recipename && validator.isEmpty(request.body.recipename)) {
      response.status(400).send({
        message: 'Please Input the Name',
      });
      return false;
    }
    if (!request.body.methods && validator.isEmpty(request.body.methods)) {
      response.status(400).send({
        message: 'The method of preparation must be included',
      });
      return false;
    }
    if (!request.body.ingredients && validator.isEmpty(request.body.ingredients)) {
      response.status(400).send({
        message: 'Access is Required',
      });
      return false;
    }
    return true;
  }


  /**
   * @description Checks Authorization for deleting
   * @static
   * @param {object} request Client's request
   * @param {object} response Server Response
   * @param {integer} userid id of recipe's author
   * @returns {boolean} true or false
   * @memberof RecipeValidator
   */
  static allowDelete(request, response, userid) {
    if (request.loggedInUser.userid !== parseInt(userid)) {
      response.status(403).send({
        message: 'You cannot delete someone else\'s recipe',
      });
      return false;
    }
    return true;
  }

  /**
   * @description Validates recipe ID before being accessed
   * @static
   * @param {object} request Client's request
   * @param {object} response Server Response
   * @param {any} recipeid of the recipe to be accessed
   * @returns {boolean} true or false
   * @memberof RecipeValidator
   */
  static recipeIdValid(request, response, recipeid) {
    if (!validator.isNumeric(recipeid)) {
      response.status(400).send({
        message: 'Recipe Id must be an integer',
      });
      return false;
    }
    return true;
}
}
