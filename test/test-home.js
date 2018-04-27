"use strict";
var db = require("../models");
var should = require("should");
var app = require("../bin/www").app;
var request = require("supertest").agent(app.listen());

var sleep = function(time){
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve("ok");
    }, time);
  });
}

describe("Index", function() {

  before((async function() {
    await sleep(1500);
    console.log('before');
  }));

  it("should return the string 'bar'", function(done) {
    request.get("/test")
    .expect(200)
    .end(function(err, res){
      if (err) { return done(err); }
      should.exist(res.body);
      res.body.foo.should.equal('bar');
      done();
    });
  });

  after(function(done) {
    console.log('after');
    done();
  });
});
