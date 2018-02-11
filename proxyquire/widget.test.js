var sinon = require('sinon'),
    Widget = require('../../widget');

describe('My widget', function () {
    var sandbox;
    
    beforeEach(function () {
        // Create a sandbox for the test
        sandbox = sinon.sandbox.create();
    });
    
    afterEach(function () {
        // Restore all the things made through the sandbox
        sandbox.restore();
    });
    
    it('is awesome', function () {
        var widget = new Widget();
        
        // Make sure to only create stubs/spies through the sandbox
        widget.fetch = sandbox.stub().returns({ one: 1, two: 2 });
        
        widget.loadData();
        
        expect(widget.fetch.called).to.be.true;
    });
})