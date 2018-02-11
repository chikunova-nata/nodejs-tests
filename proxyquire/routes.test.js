describe('funcs', () => {
    let sandbox = null;
  
    beforeEach(() => {
      sandbox = sinon.sandbox.create();
    })
  
    afterEach(() => {
      sandbox.restore()
    })
  
  
    it ('Should create a valid url and test to see if funcB was called with the correct args', async () => {
      const stubRoute53 = sandbox.stub(funcs, 'getRoute53').returns('https://sample-route53.com/');
      const stubFuncB = sandbox.stub(funcs, 'funcB').resolves('Not interested in the output');
  
      await funcs.funcA('1234');
  
      sinon.assert.calledWith(stubFuncB, 'https://sample-route53.com/1234')
    })
  })