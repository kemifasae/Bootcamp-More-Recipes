import jwt from 'jsonwebtoken';

/**
 * @description jwt sign function
 * @param {string} id User Id
 * @param {string} email User Email
 * @returns {object} encoded token
 */
export default {
  genToken: (id, email) =>
    jwt.sign(
      { id, email },
      process.env.JWT_SECRET,
      { expiresIn: 60 * 60 }
    ),
};
