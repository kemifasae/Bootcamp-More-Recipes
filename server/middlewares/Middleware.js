// import validator from 'validatorjs';

import jwt from 'jsonwebtoken';

require('dotenv').config();

/**
 * Authenticates user before login
 * 
 * @export default class
 * @class Middleware
 */
export default class Middleware {
    static authorize(request, response, next) {
        if (!request.headers.authorization) {
            response.status(401).send({
            message: 'You are not Logged In',
            });
            return false;
        }
        const token = request.headers.authorization;
        request.token = token;
        jwt.verify(request.token, process.env.JWT_SECRET, (error, decoded) => {
            if (error) {
            return response.status(401)
                .send({ message: 'Invalid Token' });
            }
            request.loggedInUser = decoded;
            next();
        });
    }
}
