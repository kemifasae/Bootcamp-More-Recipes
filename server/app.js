import express from 'express';
import path from 'path';
import logger from 'morgan';
import bodyParser from 'body-parser';
import expressJWT from 'express-jwt';
import Route from './routes';


const app = express();

const dotenv = require('dotenv');

dotenv.config();


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(expressJWT({ secret: process.env.JWT_SECRET }).unless({ path: ['/api/v1/users/signUp', '/api/v1/users/login'] }));

// Require our routes into the application.
Route(app);

app.get('/', (req, res) =>
res.status(202).send({ message: 'Please enter HTTP Request' }));

app.get('*', (request, response) => response.status(404).send({
  message: 'INVALID ROUTE!!!.',
}));
app.post('*', (request, response) => response.status(404).send({
  message: 'INVALID ROUTE!!!.',
}));
app.put('*', (request, response) => response.status(404).send({
  message: 'INVALID ROUTE!!!.',
}));
app.delete('*', (request, response) => response.status(404).send({
  message: 'INVALID ROUTE!!!.',
}));

export default app;

