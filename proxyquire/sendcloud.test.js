var proxyquire = require('proxyquire');
var sinon = require('sinon');
var Sendcloud = require('sendcloud');

require('sinon-as-promised');

describe('service', function() {
  var service;
  var sc;

  beforeEach(function() {
    delete require.cache['sendcloud'];

    sc = sinon.createStubInstance(Sendcloud);

    service = proxyquire('./service', {
      'sendcloud': sinon.stub().returns(sc)
    });
  });

  it('#restorePassword', function(done) {
    sc.send.resolves({});

    var obj = {
      to: 'to',
      name: 'name',
      token: 'token'
    };

    service.restorePassword(obj, function() {
      console.log(sc.send.args[0]);
      done();
    });
  });
});