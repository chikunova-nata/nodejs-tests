document.body.getElementsByTagName('div')[0].getAttribute('data-example');
var stub = sinon.stub(someObject, 'aFunction');
var getElsStub = sinon.stub(document.body, 'getElementsByTagName');


function setSomeAttributes(element) {
    var id = element.id;
    element.setAttribute('data-id', id);
    element.setAttribute('data-child-count', element.children.length);
  }
 var elStub = {
    id: 'foo',
    children: [],
    setAttribute: sinon.stub()
  };


  function applyClass(parent, cssClass) {
    var els = parent.querySelectorAll('.something-special');
    for(var i = 0; i < els.length; i++) { 
      els[i].classList.add(cssClass);
    }
  }
  it('adds correct class', function() {
    var parent = {
      querySelectorAll: sinon.stub()
    };
    var elStub = {
      classList: {
        add: sinon.stub()
      }
    };
    parent.querySelectorAll.returns([elStub]);
    var expectedClass = 'hello-world';
   
    applyClass(parent, expectedClass);
   
    sinon.assert.calledWith(elStub.classList.add, expectedClass);
  });


  document.body.getElementsByTagName('div')[0].getAttribute('data-example')
  var getEls = sinon.stub(document.body, 'getElementsByTagName');
  var fakeDiv = {
    getAttribute: sinon.stub()
  };
  getEls.withArgs('div').returns([fakeDiv]);