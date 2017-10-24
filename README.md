# Bootcamp-More-Recipes

The More-Recipes app is an avenue for people to showcase their interesting and unique recipes.
It allows a user to post a recipe he/she has come up with and get feedback in form of upvotes, downvotes  and reviews from users who explore that recipe.

The application has the following features:
```
- sign up
- sign in
- upvote recipe
- downvote recipe
- view recipe details
Only registered users are allowed to do the following:
- add a new recipe
- delete a recipe (only ones they added)
- update a recipe (only ones that belong to them)
- make reviews on other recipes
```
##Project Dependencies
###Dependencies
```
babel-cli: Babel Command Line
babel-core: Babel Core. It compiles es6 used in the application to es5
babel-eslint: Custom Parser for ESlint
babel-preset-es2015: Babel Preset for all ES2015 Plugins
babel-preset-stage-2: Babel Preset for stage 2 plugins
bcrypt: A bycrypt library for NodeJS
body-parser: NodeJs body parsing middleware
dotenv: Loads enviroment variables from .env file
express: Fast, Unopinionated minimalistic web framework. Used as the web server for this application
jsonwebtoken: JSON Web Token Implementation
morgan: HTTP Request Logger Middleware for NodeJs
pg: postgreSQL Client
pg-hstore: A module for serializing and deserializing JSON data into hstore format
sequelize: Multi dialect ORM for NodeJS
validator: A library of string validators and sanitizers.
```
###Dev-Dependencies
```
chai: BDD/TDD Assertion Library for NodeJS and the web
eslint: A syntax highlighter.
eslint-config-airbnb-base: Airbnb's bade JS Eslint config.
eslint-plugin-import: Supports linting of ES2015+ (ES6+) import/export syntax
mocha: Test framework
nodemon: A simple monitor script for development use. For Live Reloading
supertest: SuperAgent driven library for testing HTTP servers
```

    The app has the following API endpoints to access each section.
        - POST:/api/users/signup (route which allows users to sign up on the app)
        - POST:/api/users/signip (route which allows users to sign in on the app)
        - POST:/api/recipes (route which allows authenticated users to add a recipe)
        - PUT:/api/recipes/:recipeid (route which allows authenticated users to modify recipes they added on the app)
        - DELETE:/api/recipes/:recipeid (route which allows authenticated users to delete recipes they added on the app)
        - GET:/api/recipes/ (which allows a user to get all the recipes in the app)
        - POST:/api/recipes/:recipeid/reviews (which allows authenticated users to post reviews for a recipe on the app)
        - GET:/api/users/:userid/recipes/ (which allows an authenticated user to get all his/her favorite recipes)
        - GET:/api/recipes?sort=upvotes&order=desc (which allows a user to get just recipes with the most upvotes)




