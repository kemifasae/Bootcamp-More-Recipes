import RecipeController from './controllers/RecipeController';
import UserController from './controllers/UserController';
import Middleware from './middlewares/Middleware';


const Route = (app) => {
// Endpoints for users
  app.post('/api/v1/users/login', UserController.login);
  app.post('/api/v1/users/signUp', UserController.create);
  app.get('/api/v1/users/userid/recipes', Middleware.authorize, RecipeController.getFavoriteRecipes);

  // Endpoints for recipes
  app.post('/api/v1/recipes', RecipeController.create);
  app.get('/api/v1/recipes', RecipeController.getAllRecipes);
  // app.get('/api/v1/recipes/:recipeid', RecipeController.retrieve);

  // route for put
  app.put('/api/v1/recipes/:recipeid', Middleware.authorize, RecipeController.updateRecipe);
  // route for delete 
  app.delete('/api/v1/recipes/:recipeid', Middleware.authorize, RecipeController.deleteRecipe);
  // route for review 
  app.post('/api/v1/recipes/:recipeid/reviews', Middleware.authorize, RecipeController.postReview);
  // route for upvotes
  app.get('/api/v1/recipes?sort=upvotes&order=des', RecipeController.getHighRecipes);
};
export default Route;
