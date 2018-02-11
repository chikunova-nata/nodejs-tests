const jwt = require("jsonwebtoken");

module.exports = {
  ensureAuthenticated: function(req, res) {
    return new Promise(function(resolve, reject) {
      const token = req.query.token;
      if (!token) {
        return reject({
          status: 401
        });
      } else {
        jwt
          .verify(token, "secret", function(err, decoded) {
            if (err) {
              return reject({
                status: 401
              });
            } else {
              req.user = decoded;
              resolve();
            }
          });
      }
    });
  }
};