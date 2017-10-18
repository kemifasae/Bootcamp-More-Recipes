import Validator from 'validatorjs';
import RecipeValidator from '../validators/RecipeValidator';


const Recipe = require('../models').Recipe;
const Review = require('../models').Review;
const Favorite = require('../models').Favorite;

const recipeRules = {
  recipeName: 'required|between:8,90',
  summary: 'between:8,140',
  prepTime: 'between:3,30',
  category: 'string',
  ingredients: 'required|min:15',
  methods: 'required|min:10',
  upvotes: 'integer',
  downvotes: 'integer'
};
const updateRules = {
  recipeName: 'between:8,90',
  summary: 'between:8,140',
  prepTime: 'between:3,30',
  category: 'string',
  ingredients: 'min:15',
  methods: 'min:10',
  upvotes: 'integer',
  downvotes: 'integer'
};
const reviewRules = {
  message: 'required|min:9'
};

export default class RecipeController {
  static create(request, response) {
    const validate = new Validator(request.body, recipeRules);
    if (validate.passes()) {
      return Recipe
        .create({
          recipeName: request.body.recipeName,
          userId: request.loggedInUser.id,
          summary: request.body.summary,
          category: request.body.category,
          prepTime: request.body.prepTime,
          methods: request.body.methods,
          ingredients: request.body.ingredients,
          upvotes: request.body.upvotes,
          downvotes: request.body.downvotes
        })
        .then(createdRecipe => response.status(201).send({
          message: 'New Recipe Added',
          data: createdRecipe,
        }))
        .catch(error => response.status(500).send(error.toString()));
    }
    response.status(400).json({
      status: 'Unsuccessful',
      message: 'Invalid data input',
      errors: validator.errors.all(),
    });
  }

  // get all recipes
  static getAllRecipes(request, response) {
    Recipe.findAll({})
      .then(result => response.json({
        status: 'Successful',
        data: result
      }))
      .catch(error => response.status(412).json({
        message: 'no recipes at all',
        status: error
      })
      );
  }

  static getRecipe(request, response) {
    const requestId = parseInt(request.params.recipeId);
    Recipe.findOne({
      where: { id: requestId },
    })
      .then((recipe) => {
        if (!recipe) {
          return response.status(401).json({
            status: 'Unsuccessful',
            message: 'Recipe not found',
          });
        }
        response.status(200).json({
          status: 'Successful',
          data: recipe,
        });
      });
  }

  static updateRecipe(request, response) {
    const recipeId = parseInt(request.params.recipeId);
    Recipe.findById(recipeId)
      .then((recipe) => {
        if (RecipeValidator.allowUpdate(request, response, recipe.userId)) {
          const validate = new Validator(request.body, updateRules);
          if (validate.passes()) {
            return recipe
              .update({
                recipeName: request.body.recipeName || recipe.recipeName,
                summary: request.body.summary || recipe.summary,
                category: request.body.category || recipe.category,
                prepTime: request.body.prepTime || recipe.prepTime,
                methods: request.body.methods || recipe.methods,
                ingredients: request.body.ingredients || recipe.ingredients,
                upvotes: request.body.upvotes || recipe.upvotes,
                downvotes: request.body.downvotes || recipe.downvotes,
              })
              .then((updatedDetails) => {
                delete updatedDetails.dataValues.userId;
                response.status(200).send({
                  status: 'Successful',
                  data: `${recipe.recipeName} has been updated`,
                });
              }).catch((error => response.status(500).send(error.toString())));
          }
          response.status(400).json({
            status: 'Unsuccessful',
            message: 'Invalid data input',
            errors: validate.errors.all(),
          });
        } else {
          response.status(403).json({
            status: 'Unsuccessful',
            message: 'You cannot edit someone else\'s recipe',
          });
        }
      })
      .catch((err => response.status(404).send(err.toString())));
  }

  static deleteRecipe(request, response) {
    const recipeId = parseInt(request.params.recipeId);
    Recipe.findById(recipeId)
      .then((recipe) => {
        if (RecipeValidator.allowDelete(request, response, recipe.userId)) {
          return recipe
            .destroy()
            .then(() => response.status(200).send({
              message: `${recipe.recipeName} has been deleted`
            }))
            .catch(err => response.status(500).send(err.toString()));
        }
      })
      .catch(error => response.status(500).send(error.toString()));
  }

  static postReview(request, response) {
    const recipeId = parseInt(request.params.recipeId);
    Recipe.findById(recipeId)
      .then((recipe) => {
        if (recipe) {
          const validator = new Validator(request.body, reviewRules);
          if (validator.passes()) {
            Review.create({
              message: request.body.message,
              recipeId: parseInt(request.params.recipeId),
              userId: request.loggedInUser.id,
            })
              .then((review) => {
                response.status(200).json({
                  status: 'Successful',
                  data: review,
                });
              })
              .catch(error => response.status(400).send(error));
          } else {
            response.status(400).json({
              status: 'Unsuccessful',
              message: 'Invalid data input',
              errors: validator.errors.all(),
            });
          }
        } else {
          response.status(400).json({
            status: 'Unsuccessful',
            message: 'Recipe Not Found',
          });
        }
      })
      .catch(error => response.status(400).send(error));
  }

  static getHighRecipes(request, response) {
    const property = {
      order: [
        [sequelize.fn('max', sequelize.col('upvotes')), 'DESC'],
      ],
      limit: 10,
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    };
    Recipe
      .findAll(property)
      .then(result => response.json.status(200).send({
        status: 'Successful',
        data: result
      }))
      .catch(error => response.status(412).json({
        message: 'no recipes at all',
        status: error
      })
      );
  }

  static getFavoriteRecipes(request, response) {
    Favorite.findAll({
      where: {
        userId: request.params.userId,
      },
      include: [{
        model: Recipes,
        attributes: ['recipename', 'summary', 'author'],
      }],
    }).then((favoriteRecipes) => {
      if (favoriteRecipes.length === 0) {
        response.status(200).json({
          status: 'Successful',
          message: 'You Currently Have No Favorite Recipes'
        });
      } else {
        response.status(200).json({
          status: 'Successful',
          data: favoriteRecipes
        });
      }
    })
      .catch(error => response.status(400).send(error));
  }
}
