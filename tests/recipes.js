import request from 'supertest';
import { expect } from 'chai';
import app from '../server/server';

const dotenv = require('dotenv');
const bcrypt = require('bcrypt');

process.env.NODE_ENV = 'test';
const saltRounds = 10;

dotenv.config();

const User = require('../server/models').User;
const Recipe = require('../server/models').Recipe;
const Review = require('../server/models').Review;

const userToken = jwt.sign(
  { id: 1 },
  process.env.JWT_SECRET, { expiresIn: 60 * 60 });
const userToken2 = jwt.sign(
  { id: 2 },
  process.env.JWT_SECRET, { expiresIn: 60 * 60 });

describe('Test Recipe endpoints', () => {
  beforeEach((done) => {
    Recipe.destroy({
      where: {},
      truncate: true,
      cascade: true,
      restartIdentity: true
    })
      .then(() => {
        done();
      });
  });

  describe('Create User Endpoint', () => {
    it('should successfully create a new recipe', (done) => {
      request(app)
        .post('/api/v1/recipes')
        .send({
          recipeName: 'Pounded Yam and egusi soup',
          userId: 1,
          summary: 'typical ondo and ekiti food',
          category: 'dinner',
          prepTime: '40mins',
          methods: 'peel the yam, cook the yam and them pound, then cook the soup',
          ingredients: 'yam, water, salt, egusi',
          upvotes: 55,
          downvotes: 4
        })
        .set('Authorization', `${userToken}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end((err, response) => {
          expect(response.status).to.equal(201);
          expect(response.body.recipeName).to.equal('Pounded Yam and egusi soup');
          expect(response.body.summary).to.equal('typical ondo and ekiti food');
          expect(response.body.category).to.equal('dinner');
          expect(response.body.prepTime).to.equal('40mins');
          done();
        });
    });

    it('should not create a recipe with invalid fields', (done) => {
      request(app)
        .post('/api/v1/recipes')
        .send({
          recipeName: 'Poo',
          userId: 1,
          summary: 'dse',
          category: 'dine',
          prepTime: '40mins',
          methods: 'peel the yam, cook the yam and them pound, then cook the soup',
          ingredients: '',
          upvotes: 55,
          downvotes: 4
        })
        .set('Authorization', `${userToken}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end((err, response) => {
          expect(response.status).to.equal(400);
          expect(response.body.message).to.equal('Invalid data input');
          done();
        });
    });

    it('should not create a recipe without a required field', (done) => {
      request(app)
        .post('/api/v1/recipes')
        .send({
          recipeName: 'Pounded Yam and egusi soup',
          userId: 1,
          summary: 'typical ondo and ekiti food',
          category: 'dinner',
          prepTime: '40mins',
          methods: '',
          ingredients: 'yam, water, salt, egusi',
          upvotes: 55,
          downvotes: 4
        })
        .set('Authorization', `${userToken}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end((err, response) => {
          expect(response.status).to.equal(400);
          expect(response.body.message).to.equal('Invalid data input');
          done();
        });
    });

    it('should not create a recipe with an empty recipe name', (done) => {
      request(app)
        .post('/api/v1/recipes')
        .send({
          recipeName: '',
          userId: 1,
          summary: 'typical ondo and ekiti food',
          category: 'dinner',
          prepTime: '40mins',
          methods: 'peel the yam, cook the yam and them pound, then cook the soup',
          ingredients: 'yam, water, salt, egusi',
          upvotes: 55,
          downvotes: 4
        })
        .set('Authorization', `${userToken}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end((err, response) => {
          expect(response.status).to.equal(400);
          expect(response.body.message).to.equal('Invalid data input');
          done();
        });
    });

    it('should not post an entry twice', (done) => {
      Recipe.create(
        {
          recipeName: 'Pounded Yam and egusi soup',
          userId: 1,
          summary: 'typical ondo and ekiti food',
          category: 'dinner',
          prepTime: '40mins',
          methods: 'peel the yam, cook the yam and them pound, then cook the soup',
          ingredients: 'yam, water, salt, egusi',
          upvotes: 55,
          downvotes: 4
        }
      );

      request(app)
        .post('/api/v1/recipes')
        .send({
          recipeName: 'Pounded Yam and egusi soup',
          userId: 1,
          summary: 'typical ondo and ekiti food',
          category: 'dinner',
          prepTime: '40mins',
          methods: 'peel the yam, cook the yam and them pound, then cook the soup',
          ingredients: 'yam, water, salt, egusi',
          upvotes: 55,
          downvotes: 4
        })
        .set('Authorization', `${userToken}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end((err, response) => {
          expect(response.status).to.equal(400);
          expect(response.body.message).to.equal('Entry already made!');
          done();
        });
    });
  });

  describe('Get All Recipes Endpoint', () => {
    it('should return the right message when no recipe is found', (done) => {
      Recipe.destroy({
        where: {},
        truncate: true,
        cascade: true,
        restartIdentity: true
      });
      request(app)
        .get('/api/v1/recipes/')
        .set('Accept', 'application/json')
        .end((err, response) => {
          expect(response.status).to.equal(200);
          expect(response.body.message).to.equal('no recipes at all');
          done();
        });
    });

    beforeEach((done) => {
      Recipe.create(
        { recipeName: 'Pounded Yam and egusi soup',
          userId: 1,
          summary: 'typical ondo and ekiti food',
          category: 'dinner',
          prepTime: '40mins',
          methods: 'peel the yam, cook the yam and them pound, then cook the soup',
          ingredients: 'yam, water, salt, egusi',
          upvotes: 55,
          downvotes: 4
        }
      ).then(() => {
        done();
      });
      done();
    });

    it('should successfully get all recipes', (done) => {
      request(app)
        .get('/api/v1/recipes/')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end((err, response) => {
          expect(response.status).to.equal(200);
          expect(response.body.object[0].recipeName).to.equal('Pounded Yam and egusi soup');
          expect(response.body.object[0].summary).to.equal('typical ondo and ekiti food');
          expect(response.body.object[0].category).to.equal('dinner');
          expect(response.body.object[0].prepTime).to.equal('40mins');
          expect(response.body.metaData.page).to.equal(1);
          expect(response.body.metaData.pageCount).to.equal(1);
          expect(response.body.metaData.count).to.equal(1);
          expect(response.body.metaData.totalCount).to.equal(1);
          done();
        });
    });
  });

  describe('Get One Recipe', () => {
    it('should return 404 if recipe not found', (done) => {
      request(app)
        .get('/api/v1/recipes/10')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end((err, response) => {
          expect(response.status).to.equal(404);
          expect(response.body.message).to.equal('Recipe not found');
          done();
        });
    });

    it('should successfuly return the recipe if found', (done) => {
      request(app)
        .get('/api/v1/recipes/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end((err, response) => {
          expect(response.status).to.equal(200);
          expect(response.body.recipeName).to.equal('Pounded Yam and egusi soup');
          expect(response.body.summary).to.equal('typical ondo and ekiti food');
          done();
        });
    });
  });

  describe('Update Recipe Endpoint', () => {
    beforeEach((done) => {
      Recipe.bulkCreate([
        {
          recipeName: 'Pounded Yam and egusi soup',
          userId: 1,
          summary: 'typical ondo and ekiti food',
          category: 'dinner',
          prepTime: '40mins',
          methods: 'peel the yam, cook the yam and them pound, then cook the soup',
          ingredients: 'yam, water, salt, egusi',
          upvotes: 55,
          downvotes: 4
        },
        {
          recipeName: 'Pounded Garri and efo soup',
          userId: 2,
          summary: 'typical abeokuta food',
          category: 'dinner',
          prepTime: '45mins',
          methods: 'boil water, pour garri, make the eba, then cook the soup',
          ingredients: 'garri, water, salt, egusi',
          upvotes: 45,
          downvotes: 14
        },
      ]).then(() => {
        done();
      });
    });

    it('should return a 404 error if recipe not found', (done) => {
      request(app)
        .put('/api/v1/recipes/10')
        .set('Authorization', `${userToken}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .send({
          upvotes: 100
        })
        .end((err, response) => {
          expect(response.status).to.equal(404);
          expect(response.body.message).to.equal('Recipe not found');
          done();
        });
    });

    it('should not allow another user to update other recipe', (done) => {
      request(app)
        .put('/api/v1/recipes/1')
        .set('Authorization', `${userToken2}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .send({
          recipeName: 'Amala and ewedu with ogufe',
          methods: 'make amala, cook ewedu, cook stew and serve',
        })
        .end((err, response) => {
          expect(response.status).to.equal(403);
          expect(response.body.message).to.equal('You cannot edit someone else\'s recipe');
          done();
        });
    });

    it('should successfully update only the recipe\'s recipeName and methods', (done) => {
      request(app)
        .put('/api/v1/recipes/1')
        .set('Authorization', `${userToken}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .send({
          recipeName: 'Amala and ewedu with ogufe',
          methods: 'make amala, cook ewedu, cook stew and serve',
        })
        .end((err, response) => {
          expect(response.status).to.equal(200);
          expect(response.body.message).to.equal('Amala and ewedu with ogufe has been updated');
          expect(response.body.updatedDetails.recipeName).to.equal('Amala and ewedu with ogufe');
          expect(response.body.updatedDetails.methods).to.equal('make amala, cook ewedu, cook stew and serve');
          expect(response.body.updatedDetails.ingredients).to.equal('yam, water, salt, egusi');
          done();
        });
    });

    it('should successfully update the only the recipe\'s preptime',
      (done) => {
        request(app)
        .put('/api/v1/recipes/2')
        .set('Authorization', `${userToken2}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .send({
          prepTime: '1hr 20mins',
        })
        .end((err, response) => {
          expect(response.status).to.equal(200);
          expect(response.body.message).to.equal('Pounded Garri and efo soup has been updated');
          expect(response.body.updatedDetails.recipeName).to.equal('Pounded Garri and efo soup');
          expect(response.body.updatedDetails.prepTime).to.equal('1hr 20mins');
          expect(response.body.updatedDetails.category).to.equal('dinner');
          done();
        });
          });

    it('should not allow invalid details from users',
      (done) => {
        request(app)
          .put('/api/v1/users/2')
          .set('Authorization', `${userToken2}`)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .send({
            recipeName: 'Poun',
            userId: 2,
            summary: 't',
            category: 'dinner',
            methods: 'boil water, pour garri, make the eba, then cook the soup',
            ingredients: 'egusi',
            upvotes: 45,
            downvotes: 14,
            prepTime: '1hr 20mins',
          })
          .end((err, response) => {
            expect(response.status).to.equal(400);
            expect(response.body.message).to.equal('Invalid data input');
            done();
          });
      });

    it('should not allow empty fields',
      (done) => {
        request(app)
          .put('/api/v1/users/1')
          .set('Authorization', `${userToken}`)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .send({
            recipeName: ''
          })
          .end((err, response) => {
            expect(response.status).to.equal(400);
            expect(response.body.message).to.equal('Invalid data input');
            done();
          });
      });
  });

  describe('Delete Recipe Endpoint', () => {
    beforeEach((done) => {
      Recipe.bulkCreate([
        {
          recipeName: 'Pounded Yam and egusi soup',
          userId: 1,
          summary: 'typical ondo and ekiti food',
          category: 'dinner',
          prepTime: '40mins',
          methods: 'peel the yam, cook the yam and them pound, then cook the soup',
          ingredients: 'yam, water, salt, egusi',
          upvotes: 55,
          downvotes: 4
        },
        {
          recipeName: 'Pounded Garri and efo soup',
          userId: 2,
          summary: 'typical abeokuta food',
          category: 'dinner',
          prepTime: '45mins',
          methods: 'boil water, pour garri, make the eba, then cook the soup',
          ingredients: 'garri, water, salt, egusi',
          upvotes: 45,
          downvotes: 14
        },
      ]).then(() => {
        done();
      });
    });

    it('should return a 404 error if recipe not found', (done) => {
      request(app)
        .delete('/api/v1/recipes/10')
        .set('Authorization', `${userToken}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end((err, response) => {
          expect(response.status).to.equal(404);
          expect(response.body.message).to.equal('Recipe not found');
          done();
        });
    });

    it('should not allow another user to delete other\'s recipes', (done) => {
      request(app)
        .delete('/api/v1/recipes/1')
        .set('Authorization', `${userToken2}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end((err, response) => {
          expect(response.status).to.equal(403);
          expect(response.body.message).to.equal('You cannot delete someone else\'s recipe');
          done();
        });
    });

    it('should successfully delete a recipe',
      (done) => {
        request(app)
          .delete('/api/v1/recipes/2')
          .set('Authorization', `${userToken2}`)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .end((err, response) => {
            expect(response.status).to.equal(200);
            expect(response.body.message).to.equal('Pounded Garri and efo soup has been deleted');
            done();
          });
      });
  });


  // test for post recipe review route
  describe('POST Recipe Review Endpoint', () => {
    beforeEach((done) => {
      Recipe.create(
        { recipeName: 'Pounded Yam and egusi soup',
          userId: 1,
          summary: 'typical ondo and ekiti food',
          category: 'dinner',
          prepTime: '40mins',
          methods: 'peel the yam, cook the yam and them pound, then cook the soup',
          ingredients: 'yam, water, salt, egusi',
          upvotes: 55,
          downvotes: 4
        }
      ).then(() => {
        done();
      });
      done();
    });

    it('it should post successfully', (done) => {
      request(app)
        .post('/api/v1/recipes/1/reviews')
        .send({
          message: 'Loving this recipe',
          recipeId: 1,
          userId: 2
        })
        .set('Authorization', `${userToken2}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end((err, response) => {
          expect(response.status).to.equal(200);
          expect(response.body.message).to.equal('Review added successfully');
          done();
        });
    });

    it('it should give 404 error if recipe is not found', (done) => {
      request(app)
        .post('/api/v1/recipes/4/reviews')
        .send({
          message: 'Loving this recipe',
          recipeId: 1,
          userId: 2
        })
        .set('Authorization', `${userToken2}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end((err, response) => {
          expect(response.status).to.equal(404);
          expect(response.body.message).to.equal('Review Not Found');
          done();
        });
    });

    it('it should not post an empty review', (done) => {
      request(app)
        .post('/api/v1/recipes/1/reviews')
        .send({
          message: '',
          recipeId: 1,
          userId: 2
        })
        .set('Authorization', `${userToken2}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .end((err, response) => {
          expect(response.status).to.equal(200);
          expect(response.body.message).to.equal('Invalid data input');
          done();
        });
    });
  });
});
