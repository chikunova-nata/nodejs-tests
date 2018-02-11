//You can stub the AWS SDK methods with Sinon with the following

//Wrap the AWS SDK instance and allow the this to be set externally:
//Within say, SqsService.js
var Aws = require('aws-sdk');

exports.sqsClient = new Aws.SQS({
    region: <AWS_REGION>,
    apiVersion: <API_VERSION>,
    accessKeyId: <AWS_ACCESS_KEY_ID>,
    secretAccessKey: <AWS_SECRET_KEY>
});


//When using the sqsClient, ensure to use the wrapped instance instead.
var SqsService = require('./SqsService');

function (message, callback) {
    //Do stuff..
    //Then send stuff..
    SqsService.sqsClient.sendMessage(message, callback);
});

//So modifying your test case from above, using the wrapped AWS SDK:
var request = require('superagent'),
    expect = require('chai').expect,
    assert = require('chai').assert,
    sinon = require('sinon'),
    SqsService = require('./SqsService'), //Import wrapper
    app = require("../../../../app");

describe("Activities", function () {

    describe("POST /activities", function () {

        var sendMessageStub;

        beforeEach(function(done) {
            //Stub like so here
            sendMessageStub = sinon.stub(SqsService.sqsClient, 'sendMessage').callsArgWith(1, null, { MessageId: 'Your desired MessageId' });

            done();
        });

        afterEach(function(done) {
            sendMessageStub.restore();

            done();
        });

        it("should call SQS successfully", function (done) {
            var body = {
                "custom_activity_node_id" : "1562",
                "campaign_id" : "318"
            };

            reqest
                .post('/v1/user/123/custom_activity')
                .send(body)
                .set('Content-Type', 'application/json')
                .end(function(err, res) {
                    expect(res.status).to.equal(200)

                    assert(sendMessageStub.calledOnce);
                    assert(sendMessageStub.calledWith(body));
            });
        });
    });
});

//I think the issue is that AWS SDK classes are built dynamically from JSON configuration. Here’s the one for SQS: Github.

//All API calls eventually make it down to makeRequest or makeUnauthenticatedRequest on Service, so I just stubbed those using withArgs(...). For example:
var stub = sinon.stub(AWS.Service.prototype, 'makeRequest');
stub.withArgs('assumeRole', sinon.match.any, sinon.match.any)
    .yields(null, fakeCredentials);

//which worked fine for my simple use case.

//You can do it without bringing in any extra libraries using something like this:
const mocha = require('mocha'),
    chai = require('chai'),
    expect = chai.expect,    // Using Expect style
    sinon = require('sinon'),
    AWS = require('aws-sdk');

describe('app', function () {
    var aws, sqs, app,
        sendMessageError = null,
        sendMessageData = { MessageId: "1" };
    before(() => {
        // Create a stub for the SQS lib
        sqs = sinon.stub({ sendMessage: Function() });
        // Make sure that when someone calls AWS.SQS they get our stub
        aws = sinon.stub(AWS, 'SQS');
        aws.returns(sqs);
        // Now include your app since it will `require` our stubbed version of AWS
        app = require('./app');
    });
    after(() => {
        aws.restore(); // Be kind to future tests
    });
    beforeEach(() => {
        // Reset callback behavior after each test
        sqs.sendMessage.reset();
        // Call the callback supplied to sendMessage in the 1st position with the arguments supplied
        sqs.sendMessage.callsArgWith(1, sendMessageError, sendMessageData);
    });
    it('sends messages', () => {
        // Pretend you're using Promises in your app, but callbacks are just as easy
        return app.sendMessage().then(() => {
            const args = sqs.sendMessage.getCall(0).args[0];
            expect(args.QueueUrl).to.be.eq('http://127.0.0.1/your/queue/url');
        });
    });
});