import RecipeValidator from '../validators/RecipeValidator';

const Recipe = require('../models').Recipe;
const User = require('../models').User;

export default class RecipeController {
    static create(request, response) {
        return Recipe
        .create({
            name: request.body.recipeName,
            summary: request.body.summary,
            category: request.body.category,
            
            preptime: request.body.prepTime,
            methods: request.body.methods,
            ingredients: request.body.ingredients
        })
        .then(createdRecipe => response.status(201).send({
            message: 'New Recipe Added', createdRecipe
        }))
        .catch(error => response.status(500).send(error.toString()));
        }

    // get all recipes

    static getAllRecipes(request, response) {
        Recipe.findAll({ })
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

    static updateRecipe(request, response) {
        if (RecipeValidator.recipeIdValid(request, response, request.params.id)) {
            return Recipe
               .findById(request.params.id, {
                   include: [{
                       model: User,
                   }],
               })
               .then((recipe) => {
                   if (RecipeValidator.allowUpdate(request, response, recipe.userid)) {
                       if (RecipeValidator.isRecipeComplete(request, response)) {
                           return recipe
                             .update({
                                name: request.body.recipename || recipe.name,
                                summary: request.body.summary || recipe.summary,
                                category: request.body.category || recipe.category,
                                author: request.loggedInUser.id,
                                preptime: request.body.preptime || recipe.preptime,
                                methods: request.body.methods || recipe.methods,
                                ingredients: request.body.ingredients || recipe.ingredients,
                             })
                             .then((updatedDetails) => {
                                 delete updatedDetails.dataValues.User;
                                 response.status(200).send({
                                     status: 'Successful',
                                     data: recipe
                                 });
                             }).catch((err => response.status(500).send(err.toString())));
                       }
                   }
               });
        }
    }

    static deleteRecipe(request, response) {
        if (RecipeValidator.isValidParams(
          request, response, request.params.id)) {
          return Recipe
            .findById(request.params.id)
            .then((recipe) => {
                if (RecipeValidator.allowDelete(
                  request, response, recipe.userid)) {
                  return document
                    .destroy()
                    .then(() => response.status(200).send({
                      message: 'Recipe successfully deleted' }))
                    .catch(err => response.status(500).send(err.toString()));
                }
            })
            .catch(error => response.status(500).send(error.toString()));
        }
      }

    static postReview(request, response) {
            if (RecipeValidator.recipeIdValid(request, response, request.params.id)) {
                return Recipe
                   .findById(request.params.id)
                   .then((recipe) => {
                      if (!recipe) {
                        res.status(404).json({
                          status: 'Unsuccessful',
                          message: 'Recipe Not Found'
                        });
                      } else {
                        Review.create({
                          reviewmessage: req.body.reviewmessage,
                        }).then((review) => {
                          res.status(200).json({
                            status: 'Successful',
                            data: review
                          });
                          });
                       }
                   })
                   .catch((err => response.status(500).send(err.toString())));
                }
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

    static getFavoriteRecipes(req, res) {
        Favorite.findAll({
          where: {
            userId: req.params.userid,
          },
          include: [{
            model: Recipes,
            attributes: ['recipename', 'summary', 'author'],
          }],
        }).then((favoriteRecipes) => {
          if (favoriteRecipes.length === 0) {
            res.status(200).json({
              status: 'Successful', message: 'You Currently Have No Favorite Recipes'
            });
          } else {
            res.status(200).json({
              status: 'Successful', data: favoriteRecipes
            });
          }
        })
          .catch(error => res.status(400).send(error));
      }
    }
