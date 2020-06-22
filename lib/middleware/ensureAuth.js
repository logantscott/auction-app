const User = require('../models/User');

// http://username:password@localhost.com
// eslint doesn't like optional chaining?
const usernamePasswordReader = function(authorization) {
  console.log('============================', authorization);
  // deconstruct username/password from .split() result array
  const [username, password] = Buffer
    .from(authorization?.split(' ')[1], 'base64')
    .toString()
    .split(':');

    return {
      username,
      password
    };
};

// ensureAuth is the actual middleware
const ensureAuth = (req, res, next) => {

  // deconstruct username/password from the returned object of usernamePasswordReader
  // The HTTP Authorization request header contains the credentials to authenticate a user agent with a server, usually, but not necessarily, after the server has responded with a 401 Unauthorized status and the WWW-Authenticate header.
  // this is basic auth?
  const { username, password } = usernamePasswordReader(req.headers.authorization);

  // call the authorized static of the User model
  // checks if user exists, then if exists, compares password with compare method
  User 
    .authorized(username, password)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(next);
};

module.exports = {
  usernamePasswordReader,
  ensureAuth
}
