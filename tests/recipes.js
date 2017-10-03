import request from 'supertest';
import { expect } from 'chai';
import app from '../server/server';
import chai from 'chai';
process.env.NODE_ENV = 'test';

const should = chai.should();

describe('Routes', () => {

    //invalid route for POST request
  describe('Invalid Post request', () => {
    it('should display invalid route for an invalid Post request',
      (done) => {
        request(app)
          .post('/api/recipes/')
          .send({
            id: 1,
            name:'beans'
          })
          .end((err, response) => {
            expect(response.status).to.equal(404);
            expect(response.body.message).to.equal('INVALID ROUTE!!!.');
            done();
          });
      });
  });

  //invalid route for GET request
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

  //invalid route for PUT request
  describe('Invalid Put request', () => {
    it('should return invalid route for an invalid Put request',
      (done) => {
        request(app)
          .put('/api/recipes/:recipeid')
          .send({
            id:2,
            name:'garri'
          })
          .end((err, response) => {
            expect(response.status).to.equal(404);
            expect(response.body.message).to.equal('INVALID ROUTE!!!.');
            done();
          });
      });
  });

  //invalid route for DELETE request
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

  //test the get route
  describe('/GET recipes point', () => {
    it('it should respond with json', (done) => {
        request(app)
            .get('/api/v1/recipes')
            .set('Accept','application/json')
            .expect(200)
            .end((err, res) => {
                if (err) throw err;
                //res.should.have.status(200);
                //res.body.should.be.a('array');
                //res.body.length.should.be.eql(0);
            done();
            });
        });
    });

     /*
        * Test the /POST route
        */
        describe('/POST recipes endpoint', () => {
            it('it should POST a recipe without a name', (done) => {
                let recipe = {
                    name: "Pounded yam",
                    id: 5
                }
                request(app)
                    .post('/api/v1/recipes')
                    .send(recipe)
                    .expect(201)
                    .end((err, res) => {
                        if (err) throw err;
                        //res.should.have.status(200);
                        //res.body.should.be.a('object');
                        //res.body.should.have.property('errors');
                    done();
                    });
            });
        });

        /*
        * Test the /GET/:id route
        */
        describe('/GET/:/recipe/recipeid endpoint', () => {
            it('it should return error since the recipe with the specified id does not exist', (done) => {
                request(app)
                    .get('/api/v1/recipe/1')
                    .set('Accept','application/json')
                    .expect(404)
                    .end((err, res) => {
                        if (err) throw err;
                    done();
                    });
                });
            });

        /*
        * Test the /PUT/:id route
        */
        describe('/PUT/:id recipe', () => {
            it('it should UPDATE a recipe with the supplied id', (done) => {
                request(app)
                    .put('/api/v1/recipes/1')
                    .send({name: "New name"})
                    .expect(200)
                    .end((err, res) => {
                        expect (res.body.message).to.be.eql('Updated successfully');
                        done();
                        if (err) throw err;
                    });
                });
            });

            //test delete/:id route
            describe('/DELETE/:id recipe', () => {
                it('it should DELETE a recipe with the supplied id', (done) => {
                        request(app)
                        .delete('/api/v1/recipes/1')
                        .expect(200)
                        .end((err, res) => {
                            res.body.should.have.property('message').eql('Delete done');
                            done();
                        });
                    });
                });
});
