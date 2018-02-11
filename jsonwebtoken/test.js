const chai = require("chai");
const proxyquire = require("proxyquire");
const httpMocks = require("node-mocks-http");

const expect = chai.expect;

suite("ensureAuthenticated", function() {

  test("should return 401 when token is \"undefined\"", function() {
    const sut = require("../../middleware");
    const req = httpMocks.createRequest();

    return sut
      .ensureAuthenticated(req)
      .catch(function(outcome) {
        expect(outcome.status).to.equal(401);
      });
  });

  test("should return 401 when token is invalid", function() {
    const jsonwebtoken = { };
    jsonwebtoken.verify = function(token, secret, cb) {
      cb({});
    };
    const req = httpMocks.createRequest({
      query: {
        token: "bar"
      }
    });
    const sut = proxyquire("../../middleware", {
      jsonwebtoken: jsonwebtoken
    });

    return sut
      .ensureAuthenticated(req)
      .catch(function(outcome) {
        expect(outcome.status).to.equal(401);
      });
  });

  test("should add decoded data to req object when token is valid", function() {
    const decoded = {
      username: "dummy username"
    };
    const jsonwebtoken = { };
    jsonwebtoken.verify = function(token, secret, cb) {
      cb(undefined, decoded);
    };
    const req = httpMocks.createRequest({
      query: {
        token: "dummy token"
      }
    });
    const sut = proxyquire("../../middleware", {
      jsonwebtoken: jsonwebtoken
    });

    return sut
      .ensureAuthenticated(req)
      .then(function() {
        expect(req.user).to.equal(decoded);
      });
  });
});