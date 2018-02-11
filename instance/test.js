// target.js
var GeoFire = require('geofire');

var catGeoFire = new GeoFire(catGeofireRef);
return catGeoFire.set(storeId, [lat, lon]).then(() => {
  console.log("Added store " + storeId + " to GeoFire" );
  return Promise.resolve();
});


// test.js
var GeoFire = require('geofire');
var rewire = require('rewire')
var target = rewire('./target')

describe('target', () => {
  it('test case', () => {
    // arrange

    // configure instance
    var geoFireStub = sinon.createStubInstance(GeoFire)
    geoFireStub.set.resolves()

    // configure constuctor
    var GeoFireMock = sinon.stub().returns(geoFireStub)

    // 'GeoFire' is a mocked variable here
    var revert = rewire('GeoFire', GeoFireMock)

    // act (call tested module)
    target()

    // assert (should is just for example)
    should(GeoFireMock).calledWithNew(/* params*/)
    should(geoFireStub.set).calledWith(/* params*/)

    //cleanup (rewire and stubs, prefer to use sandbox)
    revert();
    ...

  })
})