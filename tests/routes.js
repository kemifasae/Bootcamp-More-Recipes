import request from 'supertest';
import { expect } from 'chai';
import app from '../server/server';
// import chai from 'chai';
process.env.NODE_ENV = 'test';

// const should = chai.should();

describe('Routes', () => {
  // invalid route for POST request
  describe('Invalid Post request', () => {
    it('should display invalid route for an invalid Post request',
      (done) => {
        request(app)
          .post('/api/recipes/')
          .send({
            id: 1,
            name: 'beans'
          })
          .end((err, response) => {
            expect(response.status).to.equal(404);
            expect(response.body.message).to.equal('INVALID ROUTE!!!.');
            done();
          });
      });
  });

  // invalid route for GET request
  describe('Invalid Get request', () => {
    it('should display invalid route for an invalid Get request',
      (done) => {
        request(app)
          .get('/api/recipes/')
          .end((err, response) => {
            expect(response.status).to.equal(404);
            expect(response.body.message).to.equal('INVALID ROUTE!!!.');
            done();
          });
      });
  });

  // invalid route for PUT request
  describe('Invalid Put request', () => {
    it('should return invalid route for an invalid Put request',
      (done) => {
        request(app)
          .put('/api/recipes/:recipeid')
          .send({
            id: 2,
            name: 'garri'
          })
          .end((err, response) => {
            expect(response.status).to.equal(404);
            expect(response.body.message).to.equal('INVALID ROUTE!!!.');
            done();
          });
      });
  });

  // invalid route for DELETE request
  describe('Invalid Delete request', () => {
    it('should display invalid route for an invalid Delete request',
      (done) => {
        request(app)
          .delete('/api/recipes/:recipeid')
          .end((err, response) => {
            expect(response.status).to.equal(404);
            expect(response.body.message).to.equal('INVALID ROUTE!!!.');
            done();
          });
      });
  });
});
