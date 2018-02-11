//You don't need to stub fs.readFileSync() if you're also using proxyquire to replace it (in fact, stubbing fs.readFileSync() 
//is causing your problem, because it's breaking both require() and proxyquire).

//Try this:

describe('Some description', function () {
  var readFileSyncStub;

  before(function() {
    readFileSyncStub = sinon.stub()
                            .withArgs('someFile.js', { encoding: 'utf8' })
                            .returns('some text');
    sut = proxyquire('./readfilesync', { fs : { readFileSync : readFileSyncStub } });                         
  });
  after(function () {
    fs.readFileSync.restore(); // This is executed ...
  });

  it('Some it', function () {
    let value = sut();
    assert.equal(value, 'some text');
  });

});