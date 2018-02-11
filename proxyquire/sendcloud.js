var Sendcloud = require('sendcloud');
var sc = new Sendcloud("key1","key2","key3");

var service = {};

service.restorePassword = function (params, cb) {
if (!params.to || !params.name || !params.token) {
  throw "Miss params"
}

var defaultTemplate = adminBaseUrl + "reset/token/" + params.token;

var subject = params.subject || "Letter";
var template = params.template || defaultTemplate;

// Send email
sc.send(params.to, subject, template).then(function (info) {
 console.log(info)
if (info.message === "success") {
  return cb(null, "success");
} else {
  return cb("failure", null);
}
});

};

module.exports = service;