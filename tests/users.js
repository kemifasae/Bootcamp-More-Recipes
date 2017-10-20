import request from 'supertest';
import { expect } from 'chai';
import app from '../server/server';

const dotenv = require('dotenv');
const bcrypt = require('bcrypt');

process.env.NODE_ENV = 'test';
const saltRounds = 10;

dotenv.config();

const User = require('../server/models').User;

describe('User Endpoints', () => {
  beforeEach((done) => {
    User.destroy({
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
    it('should successfully create a new user', (done) => {
      request(app)
        .post('/api/v1/users/signUp')
        .send({
          firstname: 'oluwakemi',
          lastname: 'omobola',
          displayname: 'kaykayfash',
          email: 'kemmy@gm.com',
          password: 'kemifasaed'
        })
        .end((err, response) => {
          expect(response.status).to.equal(201);
          expect(response.body.data.email).to.equal('kemmy@gm.com');
          expect(response.body.data.firstname).to.equal('oluwakemi');
          expect(response.body.data.lastname).to.equal('omobola');
          expect(response.body.data.displayname).to.equal('kaykayfash');
          done();
        });
    });

    it('should not create a user with invalid fields', (done) => {
      request(app)
        .post('/api/v1/users/signUp')
        .send({
          firstname: 'ol',
          lastname: 'omobola',
          displayname: 'ka',
          email: 'kemmy@gm',
          password: 'kemi'
        })
        .end((err, response) => {
          expect(response.status).to.equal(400);
          expect(response.body.message).to.equal('Invalid data input');
          done();
        });
    });

    it('should not create a user with any empty field', (done) => {
      request(app)
        .post('/api/v1/users/signUp')
        .send({
          firstname: '',
          lastname: 'omobola',
          displayname: 'ka',
          email: '',
          password: 'kemi'
        })
        .end((err, response) => {
          expect(response.status).to.equal(400);
          expect(response.body.message).to.equal('Invalid data input');
          done();
        });
    });
    it('should not create a user with an empty password', (done) => {
      request(app)
        .post('/api/v1/users/signUp')
        .send({
          firstname: 'oluwakemi',
          lastname: 'omobola',
          displayname: 'kaykayfash',
          email: 'kemmy@gm.com',
          password: ''
        })
        .end((err, response) => {
          expect(response.status).to.equal(400);
          expect(response.body.message).to.equal('Invalid data input');
          done();
        });
    });

    it('should not create a user with an email that exists', (done) => {
      User.create(
        { firstname: process.env.FIRSTNAME,
          lastname: process.env.LASTNAME,
          displayname: process.env.DISPLAYNAME,
          email: process.env.EMAIL,
          password: bcrypt.hashSync(process.env.PASSWORD, saltRounds),
        }
      );
      request(app)
        .post('/api/v1/users/signUp')
        .send({
          firstname: 'oluwaseyi',
          lastname: 'omobobola',
          displayname: 'kaykayefash',
          email: process.env.EMAIL,
          password: 'password'
        })
        .end((err, response) => {
          expect(response.status).to.equal(400);
          expect(response.body.message).to.equal('User already exists!');
          done();
        });
    });
  });

  describe('Login Endpoint', () => {
    beforeEach((done) => {
      User.create(
        { firstname: process.env.FIRSTNAME,
          lastname: process.env.LASTNAME,
          displayname: process.env.DISPLAYNAME,
          email: process.env.EMAIL,
          password: bcrypt.hashSync(process.env.PASSWORD, saltRounds),
        }
      ).then(() => {
        done();
      });
    });

    it('should return a 404 error if user not found', (done) => {
      request(app)
        .post('/api/v1/users/login')
        .send({
          email: 'a@y.com',
          password: 'association'
        })
        .end((err, response) => {
          expect(response.status).to.equal(404);
          expect(response.body.message).to.equal('User not found');
          done();
        });
    });

    it('should not log a user in with wrong password', (done) => {
      request(app)
        .post('/api/v1/users/login')
        .send({
          email: process.env.EMAIL,
          password: 'watevaudoman'
        })
        .end((err, response) => {
          expect(response.status).to.equal(401);
          expect(response.body.message).to.equal('Wrong Password');
          done();
        });
    });

    it('should not login with an invalid email', (done) => {
      request(app)
        .post('/api/v1/users/login')
        .send({
          email: 'kemmy@gm',
          password: 'wateva'
        })
        .end((err, response) => {
          expect(response.status).to.equal(400);
          expect(response.body.message).to.equal('Invalid data input');
          done();
        });
    });

    it('should not login with an empty field', (done) => {
      request(app)
        .post('/api/v1/users/login')
        .send({
          email: '',
          password: 'wateva'
        })
        .end((err, response) => {
          expect(response.status).to.equal(400);
          expect(response.body.message).to.equal('Invalid data input');
          done();
        });
    });

    it('should successfully log a user in', (done) => {
      request(app)
        .post('/api/v1/users/login')
        .send({
          email: process.env.EMAIL,
          password: process.env.PASSWORD
        })
        .end((err, response) => {
          expect(response.status).to.equal(200);
          expect(response.body.message).to.equal('login successful');
          expect(response.body.user.email).to.equal(process.env.EMAIL);
          done();
        });
    });
  });
});
